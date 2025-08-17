# Class UnicKeyCypher
class UnicKeyCypher:

    def __init__(self, secret_key: str):
        
        self.__secret_key = self.translation_binary(secret_key.upper())

    def translation_binary(self, text: str) -> str:
        binaries = ""
        for byte in text.encode("utf-8"):
            binaries += format(byte, '08b')
        return binaries

    def translation_character(self, binaries: str) -> str:
        bytes_list = [int(binaries[i:i+8], 2) for i in range(0, len(binaries), 8)]
        return bytes(bytes_list).decode("utf-8")

    def XOR(self, input_1, input_2):
        return '1' if bool(input_1) != bool(input_2) else '0'

    def encrypt(self, message: str) -> str:
        message_bin = self.translation_binary(message)
        new_message = ""
        count = 0
        for bit in message_bin:
            bit_key = self.__secret_key[count]
            new_message += self.XOR(int(bit), int(bit_key))
            count = (count + 1) % len(self.__secret_key)
        return new_message

    def decrypt(self, message: str) -> str:
        new_message = ""
        count = 0
        for bit in message:
            bit_key = self.__secret_key[count]
            new_message += self.XOR(int(bit), int(bit_key))
            count = (count + 1) % len(self.__secret_key)
        return self.translation_character(new_message)

