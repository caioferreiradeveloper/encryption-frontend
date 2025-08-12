// React imports
import { useForm } from 'react-hook-form';
import { CopyAllOutlined, Https, NoEncryption, Shuffle,  } from '@mui/icons-material';
import { useState, useEffect } from 'react';

// Component imports
import TextInput from "../../components/Input/InputText";
import TextAreaInput from '../../components/Input/InputTextarea';
import ButtonText from '../../components/Button/ButtonText';
import { showToastError, showToastSuccess } from '../../components/GlobalToast';

// Style imports
import styles from "./TranspositionCipher.module.scss";
import ButtonIcon from '../../components/Button/ButtonIcon';


// TranspositionCipher Page
export default function TranspositionCipher() {

    // Destructure methods from react-hook-form's context API
    const {
        register,
        getValues,
        setValue,
        watch,
        trigger,
        formState: { errors }
    } = useForm();

    // Declarate observation KeyValue 
    const keyValue = watch("key", "");

    // Variables by useState
    const [pyodide, setPyodide] = useState<any>(null);
    const [visible, setVisible] = useState<boolean>(false);

    // Function to copy the "result" field content to the clipboard
    const copyMessage = () => {

        // Get the value of the "result" field from the form
        const text = watch("result"); 

        // If there is text to copy
        if (text) {
            // Write the text to the user's clipboard
            navigator.clipboard.writeText(text).then(() => {
                // Show a success toast notification
                showToastSuccess('Mensagem copiada com sucesso!')
            })
        }
    }

    // Function to copy the "key" field content to the clipboard
    const copyKey = () => {

        // Get the value of the "key" field from the form
        const text = watch("key"); 

        // If there is a key to copy
        if (text) {

            // Write the key to the user's clipboard
            navigator.clipboard.writeText(text).then(() => {

                // Show a success toast notification
                showToastSuccess('Chave copiada com sucesso!')
            })
        }
    }


  useEffect(() => {
  (async () => {
    const py = await (window as any).loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    });

    // Baixa o conteúdo do seu arquivo .py
    const pyCode = await fetch("/transposition_cipher.py").then((r) => r.text());

    // Salva no FS do Pyodide
    py.FS.writeFile("transposition_cipher.py", pyCode);

    setPyodide(py);
  })();
}, []);



useEffect(() => {
  if (keyValue.trim() !== "") {
    setVisible(true);
  } else {
    setVisible(false);
  }
}, [keyValue]);


    const generateRandomKey = (tamanho: number = 16) => {
        const caracteres = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;<>,.?/~`-=";
        let chave = "";
        
        for (let i = 0; i < tamanho; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            chave += caracteres[indice];
        }
        
        setValue("key", chave.toLowerCase()) ;
    }


    const onSubmit = async (mode: boolean) => {

        // mode True -> Encrypt
        // mode False -> Decrypt
        const valid = await trigger(["key", "message"]);

        if (!valid) {
            showToastError("Preencha o formulário corretamente!");
            return
        }

        if (!pyodide) return;

        const key = getValues("key");
        const message = getValues("message");

        pyodide.globals.set("key", key);
        pyodide.globals.set("message", message);

        if (mode) {
            const result = pyodide.runPython(`
                from transposition_cipher import TranspositionCipher
                cipher = TranspositionCipher(key)
                cipher.main_encrypt(message)
            `);
            showToastSuccess("Mensagem criptografada com sucesso!")

            setValue("result", result);
        } else {
            const result = pyodide.runPython(`
                from transposition_cipher import TranspositionCipher
                cipher = TranspositionCipher(key)
                cipher.main_decrypt(message)
            `);

            showToastSuccess("Mensagem descriptografada com sucesso!")

            setValue("result", result);
        }
    }

  return (
    <>
        {/* Container */}
        <div className={styles.transpositionContainer}>

            {/* Header */}
            <div className={styles.transpositionHeader}>
                <h1># Cifra de Transposição</h1>
            </div>

            {/* Form */}
            <form className="form-default">
                <div style={{
                    display: 'flex',
                    width: '100%',
                    gap: '1rem'
                }}>

                    <TextInput
                        name="key"
                        label='Chave'
                        register={{
                            ...register("key", {
                                required: "Chave é obrigatória"
                            })
                        }}
                        error={errors.key} 
                        type={'text'}
                    />

                    {/* Options Button */}
                    <div style={{display: 'flex', gap: '1rem', marginTop: '18px'}}>

                        {visible &&

                            // Copy button
                            <ButtonIcon IconButton={CopyAllOutlined} className='addColor' type='button' onClick={copyKey}></ButtonIcon>

                        }

                        {/* Generate random key button */}
                        <ButtonIcon IconButton={Shuffle} type='button' className='githubColor' onClick={() => {generateRandomKey(20)}}></ButtonIcon>
                        
                    </div>
        
                </div>
                
                <TextAreaInput   
                    label='Mensagem'
                    name="message"
                    register={{
                        ...register("message", {
                            required: "Mensagem é obrigatória"
                        })
                    }}
                    error={errors.message}
                />

                {/* Options */}
            <div className='stepper-button-options span-4'>

              {/* Prev Button */}
              <ButtonText 
                label="Criptografar" 
                StartIcon={Https} 
                type="button"
                className='addColor'
                onClick={() => onSubmit(true)}
              />

              {/* Clean Button */}
              <ButtonText 
                label="Descriptografar" 
                StartIcon={NoEncryption} 
                type="button"
                className='cleanColor'
                onClick={() => onSubmit(false)}
              />
            </div>
            
            <div style={{ marginTop: '100px'}} onClick={copyMessage}>

                    <TextAreaInput   
   
                    label='Resultado'
                    required={false}
                    disabled={true}
                    name="result"
                    register={{
                        ...register("result", {
                           
                        })
                    }}
                    error={errors.result}
                />
            </div>
            
            </form>
            
        </div>
    </>
  );
}
