import pandas as pd

def decriptar_matriz(matriz_encriptada, senha):
    # Obter a ordem original das colunas
    senha_ordenada = sorted(senha)
    ordem_original = []
    letras_usadas = []
    
    for letra in senha:
        # Encontrar a posição desta letra na senha ordenada
        # que ainda não foi usada
        for i, l in enumerate(senha_ordenada):
            if l == letra and i not in letras_usadas:
                ordem_original.append(i)
                letras_usadas.append(i)
                break
    
    # Reorganizar as colunas para a ordem original
    matriz_decriptada = []
    for linha in matriz_encriptada:
        linha_decriptada = [linha[i] for i in ordem_original]
        matriz_decriptada.append(linha_decriptada)
    
    return matriz_decriptada

def obter_mensagem_decriptada(matriz_decriptada):
    # Concatenar todas as letras da matriz decriptada
    mensagem = ''
    for linha in matriz_decriptada:
        mensagem += ''.join(linha)
    return mensagem

def main_decriptacao():
    print("=== Decriptação por Transposição ===")
    mensagem_encriptada = input("Digite a mensagem encriptada: ").upper()
    senha = input("Digite a palavra-passe usada na encriptação: ").upper()
    
    num_colunas = len(senha)
    num_linhas = (len(mensagem_encriptada) + num_colunas - 1) // num_colunas
    
    # Criar matriz encriptada a partir da mensagem
    matriz_encriptada = []
    for i in range(num_linhas):
        inicio = i * num_colunas
        fim = inicio + num_colunas
        linha = list(mensagem_encriptada[inicio:fim])
        matriz_encriptada.append(linha)
    
    # Mostrar matriz encriptada
    senha_ordenada = ''.join(sorted(senha))
    df_encriptada = pd.DataFrame(matriz_encriptada, columns=list(senha_ordenada))
    print("\nMatriz Encriptada Recebida:")
    print(df_encriptada)
    
    # Decriptar matriz
    matriz_decriptada = decriptar_matriz(matriz_encriptada, senha)
    df_decriptada = pd.DataFrame(matriz_decriptada, columns=list(senha))
    print("\nMatriz Decriptada (colunas na ordem original):")
    print(df_decriptada)
    
    # Obter mensagem decriptada
    mensagem_decriptada = obter_mensagem_decriptada(matriz_decriptada)
    print(f"\nMensagem Decriptada: {mensagem_decriptada}")

if __name__ == "__main__":
    main_decriptacao()