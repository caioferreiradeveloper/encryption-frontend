# Imports
import string
from typing import List


# Class VigenereCipher
class VigenereCipher:

    # Init Method
    def __init__(self, secret_key: str):

        # Declaring attributes
        self.__alpha: List[str] = list(string.ascii_lowercase) + list(string.digits) + list(string.punctuation) + list(" ")
        self.__secret_key: str = secret_key.lower()
    
    # Encrypt Method
    def encrypt(self, message: str):

        # Declaring a variable to store the count number
        count = 0

        # Message lower case tratament
        message = message.lower()

        # Declaring a variable to store the encryption result
        message_encrypt = ""

        # Foreach char in message
        for char in message:

            # Get index using char in alphabet list
            index = self.__alpha.index(char)

            # Obtaing the column list using previus index 
            column_list = self.__alpha[index:] + self.__alpha[:index]

            # Get the current character in the secret key using the count variable
            currently = self.__secret_key[count]

            # Get index using currentry key in alphabet list
            index_secret = self.__alpha.index(currently)

            # Add the character encrypt in the message encrypt 
            message_encrypt += column_list[index_secret]

            # Calcutation the new count variable
            count = (count + 1) % (len(self.__secret_key))

        # Return the message encrypt
        return message_encrypt
    
    # Decrypt Method
    def decrypt(self, encrypt_message: str):

        # Declaring a variable to store the count number
        count = 0

        # Message lower case tratament
        encrypt_message = encrypt_message.lower()

        # Declaring a variable to store the encryption result
        message_decrypt = ""

        # Foreach char in message
        for char in encrypt_message:
                
            # Get the current character in the secret key using the count variable
            currently = self.__secret_key[count]

            # Get index using currentry key in alphabet list
            index_secret = self.__alpha.index(currently)

            # Obtaing the column list using previus index_secret 
            column_list = self.__alpha[index_secret:] + self.__alpha[:index_secret]

            # Get index using char in column list
            index = column_list.index(char)

            # Add the character decrypt in the message decrypt 
            message_decrypt += self.__alpha[index]

            # Calcutation the new count variable
            count = (count + 1) % (len(self.__secret_key))

        return message_decrypt

    # String Method
    def __str__(self):

        # Retutn the alphabet list
        return f"{self.__alpha}"
