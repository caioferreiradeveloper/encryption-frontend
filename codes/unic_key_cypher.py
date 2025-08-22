# Class UnicKeyCypher
class UnicKeyCypher:

    # Init Method
    def __init__(self, secret_key: str):

        # Declaring attributes
        self.__secret_key: str =  self.translation_binary(secret_key.upper())

    # Translation character in binary
    def translation_binary(self, text):

        # Declaring a variable to store the binaries result
        binaries = ""

        # Foreach char in text
        for char in text:

            if char == " ":

                binaries += "00100000"

            else:

                # Transforming char in binary 
                binary = format(ord(char), '08b')

            # Add the binary in the binaries result
            binaries += binary

        # Return binaries result
        return binaries
    
   # Translation binary in character
    def translation_character(self, binaries):

        # Declaring a variable to store the characteres result
        characteres = ""

        binaries_list = [binaries[i:i+8] for i in range(0, len(binaries), 8)]

        # Foreach char in text
        for bit in binaries_list:

            if bit == "00100000":

                characteres += " "

            else:

                # Transforming binary in char 
                char = str(chr(int(bit, 2)))

                # Add the char in the characteres result
                characteres += char

        # Return characteres result
        return characteres

    # XOR Mehod
    def XOR(self, input_1, input_2):

        # Comparing if the two booleans are different
        result = bool(input_1) != bool(input_2)

        # Return 1 if result is equal True, else return 0
        return '1' if result else '0'

    def encrypt(self, message):
        count = 0
        new_message = ""
        message = self.translation_binary(message)
        for bit in message:
            bit_key = self.__secret_key[count]
            result = self.XOR(int(bit), int(bit_key))
            new_message += result
            count = (count + 1) % (len(self.__secret_key))
        return new_message
    
    def decrypt(self, message):

        # Declaring a variable to store the count number
        count = 0

        # Declaring a variable to store the decryption result
        message_decrypt = ""

        for bit in message:
            bit_key = self.__secret_key[count]
            if bit == " ":
                message_decrypt += bit
            else:
                result = self.XOR(int(bit), int(bit_key))
                message_decrypt += result
                count = (count + 1) % (len(self.__secret_key))

                

        return self.translation_character(message_decrypt)



if __name__ == "__main__":
    cipher = UnicKeyCypher("CHAVE")

    e = cipher.encrypt("OLA MEU AMIGO")
    print(e)
    c = cipher.decrypt("000011000000010000000000011101100000010111001011110101011101011110001100110111000100110001101100010011000001111001011101")
    print(c)