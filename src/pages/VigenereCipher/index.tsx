// React imports
import { useForm } from 'react-hook-form';
import { CopyAllOutlined, Https, NoEncryption, Shuffle } from '@mui/icons-material';
import { useState, useEffect } from 'react';

// Component imports
import TextInput from "../../components/Input/InputText";
import TextAreaInput from '../../components/Input/InputTextarea';
import ButtonText from '../../components/Button/ButtonText';
import { showToastError, showToastSuccess } from '../../components/GlobalToast';

// Style imports
import styles from "./VigenereCipher.module.scss" ;
import ButtonIcon from '../../components/Button/ButtonIcon';


// VigenereCipher Page
export default function VigenereCipher() {

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
                showToastSuccess('Mensagem copiada com sucesso!');
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
                showToastSuccess('Chave copiada com sucesso!');
            })
        }
    }

    useEffect(() => {(async () => 
        {
            // Load the Pyodide runtime from the specified CDN
            const py = await (window as any).loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
            });

            // Fetch the contents of your .py file
            const pyCode = await fetch("/vigenere_cipher.py").then((r) => r.text());

            // Save the file into Pyodide's virtual file system
            py.FS.writeFile("vigenere_cipher.py", pyCode);

            // Store the loaded Pyodide instance in the component's state
            setPyodide(py);
        })();
    }, []);

    useEffect(() => {

        // Check if keyValue is not empty (ignoring spaces)
        if (keyValue.trim() !== "") {

            // If it has content, make the element visible
            setVisible(true);

        } else {
            
            // If it's empty, hide the element
            setVisible(false);
        }
    }, [keyValue]);


    // Function to generate a random key of a given length (default: 16 characters)
    const generateRandomKey = (length: number = 16) => {
        // Set of characters to be used in the key
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;<>,.?/~`-=";
        
        // Variable to store the generated key
        let key = "";
        
        // Loop to generate each character of the key
        for (let i = 0; i < length; i++) {

            // Pick a random index from the characters string
            const indice = Math.floor(Math.random() * characters.length);

            // Add the chosen character to the key
            key += characters[indice];
        }
        
        // Set the generated key (converted to lowercase) in the form's "key" field
        setValue("key", key.toLowerCase());
    }


    const onSubmit = async (mode: boolean) => {

        // mode True  -> Encrypt
        // mode False -> Decrypt

        // Validate the "key" and "message" fields in the form
        const valid = await trigger(["key", "message"]);

        // If validation fails, show an error toast and stop execution
        if (!valid) {
            showToastError("Porfavor preencha o formulário corretamente!");
            return;
        }

        // If Pyodide is not loaded yet, stop execution
        if (!pyodide) return;

        // Get the "key" and "message" values from the form
        const key = getValues("key");
        const message = getValues("message");

        // Pass the values to the Python runtime's global variables
        pyodide.globals.set("key", key);
        pyodide.globals.set("message", message);

        if (mode) {
            // If encrypt mode is active
            const result = pyodide.runPython(`
                from vigenere_cipher import VigenereCipher
                cipher = VigenereCipher(key)
                cipher.encrypt(message)
            `);

            // Show success toast for encryption
            showToastSuccess("Mensagem criptografada com sucesso!");

            // Set the encrypted result into the "result" field
            setValue("result", result);
        } else {
            // If decrypt mode is active
            const result = pyodide.runPython(`
                from vigenere_cipher import VigenereCipher
                cipher = VigenereCipher(key)
                cipher.decrypt(message)
            `);

            // Show success toast for decryption
            showToastSuccess("Mensagem descriptografada com sucesso!");

            // Set the decrypted result into the "result" field
            setValue("result", result);
        }
    }

    // Return Page
    return (<>
        {/* Container */}
        <div className={styles.contactContainer}>

            {/* Header */}
            <div className={styles.vigenereHeader}>
                <h1># Cifra de Vigenère</h1>
            </div>

            {/* Form */}
            <form className="form-default">
                <div style={{
                    display: 'flex',
                    width: '100%',
                    gap: '1rem'
                }}>

                    {/* Key input */}
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
                
                {/* Message input */}
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
                    
                    {/* Result input */}
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
