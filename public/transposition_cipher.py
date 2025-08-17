import random
import string

class TranspositionCipher:

    def __init__(self, secret_key: str):
        self.__secret_key: str = secret_key.upper()

    def prepare(self, text):
        return ''.join([c.upper() for c in text if c.isalnum()])

    def complete(self, words, length):
        if len(words) < length:
            faltam = length - len(words)
            letras_aleatorias = ''.join(random.choice(string.ascii_uppercase) for _ in range(faltam))
            words += letras_aleatorias
        return words

    def create_matrix(self, frase):
        num_colunas = len(self.__secret_key)
        num_linhas = (len(frase) + num_colunas - 1) // num_colunas
        frase_completa = self.complete(frase, num_linhas * num_colunas)
        
        matriz = []
        for i in range(num_linhas):
            inicio = i * num_colunas
            fim = inicio + num_colunas
            linha = list(frase_completa[inicio:fim])
            matriz.append(linha)
        
        return matriz

    def encrypt(self, matriz):
        senha_ordenada = sorted(self.__secret_key)
        ordem_colunas = []
        
        for letra in senha_ordenada:
            posicoes = [i for i, l in enumerate(self.__secret_key) if l == letra]
            for pos in posicoes:
                if pos not in ordem_colunas:
                    ordem_colunas.append(pos)
                    break
        
        matriz_encriptada = []
        for linha in matriz:
            linha_encriptada = [linha[i] for i in ordem_colunas]
            matriz_encriptada.append(linha_encriptada)
        
        return matriz_encriptada, ordem_colunas

    def obter_mensagem_encriptada(self, matriz_encriptada):
        mensagem = ''
        for linha in matriz_encriptada:
            mensagem += ''.join(linha)
        return mensagem
    
    def main_encrypt(self, frase):
        matriz = self.create_matrix(frase)
        encrypt, order = self.encrypt(matriz)
        return self.obter_mensagem_encriptada(encrypt)

    def decriptar_matriz(self, matriz_encriptada):
        senha_ordenada = sorted(self.__secret_key)
        ordem_original = []
        letras_usadas = []
        
        for letra in self.__secret_key:
            for i, l in enumerate(senha_ordenada):
                if l == letra and i not in letras_usadas:
                    ordem_original.append(i)
                    letras_usadas.append(i)
                    break
        
        matriz_decriptada = []
        for linha in matriz_encriptada:
            linha_decriptada = [linha[i] for i in ordem_original]
            matriz_decriptada.append(linha_decriptada)
        
        return matriz_decriptada

    def obter_mensagem_decriptada(self, matriz_decriptada):
        mensagem = ''
        for linha in matriz_decriptada:
            mensagem += ''.join(linha)
        return mensagem
    
    def main_decrypt(self, message):
        num_colunas = len(self.__secret_key)
        num_linhas = (len(message) + num_colunas - 1) // num_colunas
        
        matriz_encriptada = []
        for i in range(num_linhas):
            inicio = i * num_colunas
            fim = inicio + num_colunas
            linha = list(message[inicio:fim])
            matriz_encriptada.append(linha)
        
        # decriptar matriz
        matriz_decriptada = self.decriptar_matriz(matriz_encriptada)

        # mensagem final
        mensagem_decriptada = self.obter_mensagem_decriptada(matriz_decriptada)
        return mensagem_decriptada

