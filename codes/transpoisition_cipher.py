import pandas as pd
import random
import string
import sys
from tkinter import Tk, Label, Entry, Button, messagebox, StringVar, Frame, ttk

class TranspositionCipherApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Criptografia por Transposição")
        
        # Criar notebook (abas)
        self.notebook = ttk.Notebook(root)
        self.notebook.pack(fill='both', expand=True)
        
        # Aba de Encriptação
        self.encrypt_frame = Frame(self.notebook)
        self.notebook.add(self.encrypt_frame, text='Encriptar')
        self.setup_encrypt_ui()
        
        # Aba de Decriptação
        self.decrypt_frame = Frame(self.notebook)
        self.notebook.add(self.decrypt_frame, text='Decriptar')
        self.setup_decrypt_ui()
    
    def setup_encrypt_ui(self):
        # Widgets para encriptação
        Label(self.encrypt_frame, text="Frase para encriptar:").pack(pady=5)
        self.encrypt_text = Entry(self.encrypt_frame, width=50)
        self.encrypt_text.pack(pady=5)
        
        Label(self.encrypt_frame, text="Palavra-passe:").pack(pady=5)
        self.encrypt_key = Entry(self.encrypt_frame, width=50)
        self.encrypt_key.pack(pady=5)
        
        Button(self.encrypt_frame, text="Encriptar", command=self.encrypt).pack(pady=10)
        
        # Área para resultados
        self.encrypt_result = Label(self.encrypt_frame, text="", wraplength=400, justify='left')
        self.encrypt_result.pack(pady=10)
    
    def setup_decrypt_ui(self):
        # Widgets para decriptação
        Label(self.decrypt_frame, text="Mensagem encriptada:").pack(pady=5)
        self.decrypt_text = Entry(self.decrypt_frame, width=50)
        self.decrypt_text.pack(pady=5)
        
        Label(self.decrypt_frame, text="Palavra-passe:").pack(pady=5)
        self.decrypt_key = Entry(self.decrypt_frame, width=50)
        self.decrypt_key.pack(pady=5)
        
        Button(self.decrypt_frame, text="Decriptar", command=self.decrypt).pack(pady=10)
        
        # Área para resultados
        self.decrypt_result = Label(self.decrypt_frame, text="", wraplength=400, justify='left')
        self.decrypt_result.pack(pady=10)
    
    def preparar_frase(self, frase):
        return ''.join([c.upper() for c in frase if c.isalnum()])
    
    def completar_frase(self, frase, tamanho):
        if len(frase) < tamanho:
            faltam = tamanho - len(frase)
            letras_aleatorias = ''.join(random.choice(string.ascii_uppercase) for _ in range(faltam))
            frase += letras_aleatorias
        return frase
    
    def criar_matriz(self, frase, senha):
        num_colunas = len(senha)
        num_linhas = (len(frase) + num_colunas - 1) // num_colunas
        frase_completa = self.completar_frase(frase, num_linhas * num_colunas)
        
        matriz = []
        for i in range(num_linhas):
            inicio = i * num_colunas
            fim = inicio + num_colunas
            linha = list(frase_completa[inicio:fim])
            matriz.append(linha)
        
        return matriz
    
    def encriptar_matriz(self, matriz, senha):
        senha_ordenada = sorted(senha)
        ordem_colunas = []
        
        for letra in senha_ordenada:
            posicoes = [i for i, l in enumerate(senha) if l == letra]
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
        return ''.join([''.join(linha) for linha in matriz_encriptada])
    
    def encrypt(self):
        frase = self.encrypt_text.get()
        senha = self.encrypt_key.get().upper()
        
        if not frase or not senha:
            messagebox.showerror("Erro", "Preencha ambos os campos!")
            return
        
        try:
            frase_limpa = self.preparar_frase(frase)
            matriz_original = self.criar_matriz(frase_limpa, senha)
            matriz_encriptada, _ = self.encriptar_matriz(matriz_original, senha)
            mensagem_encriptada = self.obter_mensagem_encriptada(matriz_encriptada)
            
            # Formatando a saída
            output = f"Frase original: {frase}\n"
            output += f"Frase preparada: {frase_limpa}\n"
            output += f"Palavra-passe: {senha}\n\n"
            output += f"Mensagem encriptada:\n{mensagem_encriptada}"
            
            self.encrypt_result.config(text=output)
        except Exception as e:
            messagebox.showerror("Erro", f"Ocorreu um erro: {str(e)}")
    
    def decriptar_matriz(self, matriz_encriptada, senha):
        senha_ordenada = sorted(senha)
        ordem_original = []
        letras_usadas = []
        
        for letra in senha:
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
        return ''.join([''.join(linha) for linha in matriz_decriptada])
    
    def decrypt(self):
        mensagem_encriptada = self.decrypt_text.get().upper()
        senha = self.decrypt_key.get().upper()
        
        if not mensagem_encriptada or not senha:
            messagebox.showerror("Erro", "Preencha ambos os campos!")
            return
        
        try:
            num_colunas = len(senha)
            num_linhas = (len(mensagem_encriptada) + num_colunas - 1) // num_colunas
            
            matriz_encriptada = []
            for i in range(num_linhas):
                inicio = i * num_colunas
                fim = inicio + num_colunas
                linha = list(mensagem_encriptada[inicio:fim])
                matriz_encriptada.append(linha)
            
            matriz_decriptada = self.decriptar_matriz(matriz_encriptada, senha)
            mensagem_decriptada = self.obter_mensagem_decriptada(matriz_decriptada)
            
            # Formatando a saída
            output = f"Mensagem encriptada: {mensagem_encriptada}\n"
            output += f"Palavra-passe: {senha}\n\n"
            output += f"Mensagem decriptada:\n{mensagem_decriptada}"
            
            self.decrypt_result.config(text=output)
        except Exception as e:
            messagebox.showerror("Erro", f"Ocorreu um erro: {str(e)}")

def main():
    root = Tk()
    root.geometry("500x400")
    app = TranspositionCipherApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()