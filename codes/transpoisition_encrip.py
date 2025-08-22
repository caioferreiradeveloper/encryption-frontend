import pandas as pd
import random
import string

def preparar_frase(frase):
    # Remove espaços, pontuação e converte para maiúsculas
    frase_limpa = ''.join([c.upper() for c in frase if c.isalnum()])
    return frase_limpa

def completar_frase(frase, tamanho):
    # Adiciona letras aleatórias se necessário para completar
    if len(frase) < tamanho:
        faltam = tamanho - len(frase)
        letras_aleatorias = ''.join(random.choice(string.ascii_uppercase) for _ in range(faltam))
        frase += letras_aleatorias
    return frase

def criar_matriz(frase, senha):
    num_colunas = len(senha)
    num_linhas = (len(frase) + num_colunas - 1) // num_colunas
    frase_completa = completar_frase(frase, num_linhas * num_colunas)
    
    # Criar matriz
    matriz = []
    for i in range(num_linhas):
        inicio = i * num_colunas
        fim = inicio + num_colunas
        linha = list(frase_completa[inicio:fim])
        matriz.append(linha)
    
    return matriz

def encriptar_matriz(matriz, senha):
    # Obter a ordem das colunas baseada na senha ordenada alfabeticamente
    senha_ordenada = sorted(senha)
    ordem_colunas = []
    
    for letra in senha_ordenada:
        # Encontrar todas as posições da letra na senha original
        posicoes = [i for i, l in enumerate(senha) if l == letra]
        for pos in posicoes:
            if pos not in ordem_colunas:
                ordem_colunas.append(pos)
                break
    
    # Reorganizar as colunas da matriz
    matriz_encriptada = []
    for linha in matriz:
        linha_encriptada = [linha[i] for i in ordem_colunas]
        matriz_encriptada.append(linha_encriptada)
    
    return matriz_encriptada, ordem_colunas

def obter_mensagem_encriptada(matriz_encriptada):
    # Concatenar todas as letras da matriz encriptada
    mensagem = ''
    for linha in matriz_encriptada:
        mensagem += ''.join(linha)
    return mensagem

def main_encriptacao():
    print("=== Encriptação por Transposição ===")
    frase = input("Digite a frase a ser encriptada: ")
    senha = input("Digite a palavra-passe: ").upper()
    
    # Preparar a frase
    frase_limpa = preparar_frase(frase)
    print(f"\nFrase preparada (sem espaços/pontuação, maiúsculas): {frase_limpa}")
    
    # Criar matriz original
    matriz_original = criar_matriz(frase_limpa, senha)
    df_original = pd.DataFrame(matriz_original, columns=list(senha))
    print("\nMatriz Original:")
    print(df_original)
    
    # Encriptar matriz
    matriz_encriptada, ordem_colunas = encriptar_matriz(matriz_original, senha)
    senha_ordenada = ''.join([senha[i] for i in ordem_colunas])
    df_encriptada = pd.DataFrame(matriz_encriptada, columns=list(senha_ordenada))
    print("\nMatriz Encriptada (colunas reordenadas):")
    print(df_encriptada)
    
    # Obter mensagem encriptada
    mensagem_encriptada = obter_mensagem_encriptada(matriz_encriptada)
    print(f"\nMensagem Encriptada: {mensagem_encriptada}")

if __name__ == "__main__":
    main_encriptacao()