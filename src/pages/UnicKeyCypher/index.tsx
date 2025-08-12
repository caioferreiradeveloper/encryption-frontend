// React imports
import { useForm } from 'react-hook-form';

import TextInput from "../../components/Input/InputText";
import styles from "./UnicKeyCipher.module.scss" ;
import TextAreaInput from '../../components/Input/InputTextarea';
import ButtonText from '../../components/Button/ButtonText';
import { CopyAllOutlined, Https, NoEncryption, Shuffle,  } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { showToastError, showToastSuccess } from '../../components/GlobalToast';




export default function UnicKeyCipher() {

    const {
        register,
        getValues,
        setValue,
        watch,
        trigger,
        formState: { errors }
    } = useForm();

    const keyValue = watch("key", "");

  const [pyodide, setPyodide] = useState<any>(null);
 const [visible, setVisible] = useState<boolean>(false);
  const copyMessage = () => {
        const text = watch("result"); 
            if (text) {
                navigator.clipboard.writeText(text)
                    .then(() => {
                    showToastSuccess('Mensagem copiada com sucesso!')
                    })
                }
  }

  const copyKey = () => {
        const text = watch("key"); 
            if (text) {
                navigator.clipboard.writeText(text)
                    .then(() => {
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
    const pyCode = await fetch("/unic_key_cypher.py").then((r) => r.text());

    // Salva no FS do Pyodide
    py.FS.writeFile("unic_key_cypher.py", pyCode);

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
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
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
                from unic_key_cypher import UnicKeyCypher
                cipher = UnicKeyCypher(key)
                cipher.encrypt(message)
            `);
            showToastSuccess("Mensagem criptografada com sucesso!")

            setValue("result", result);
        } else {
            const result = pyodide.runPython(`
                from unic_key_cypher import UnicKeyCypher
                cipher = UnicKeyCypher(key)
                cipher.decrypt(message)
            `);

            showToastSuccess("Mensagem descriptografada com sucesso!")

            setValue("result", result);
        }
    }

  return (
    <>
        {/* Container */}
        <div className={styles.contactContainer}>

            {/* Header */}
            <div className={styles.vigenereHeader}>
                <h1># Cifra de Chave Única</h1>
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

                    {/* Decrypt Button */}
                    <div style={{width: visible ? '50%': '30%', display: 'flex', gap: '1rem', marginTop: '15px'}}>

                        {visible &&
                        <ButtonText 
                            label="Copiar" 
                            StartIcon={CopyAllOutlined} 
                            type="button"
                            className='addOutlineColor'
                            onClick={copyKey}
                        />
}

                        <ButtonText 
                            label="Gerar Chave Aleatória" 
                            StartIcon={Shuffle} 
                            type="button"
                            className='cleanColor'
                            onClick={() => {generateRandomKey(20)}}
                        />

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
