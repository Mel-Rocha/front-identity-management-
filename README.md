# Vue 3 + Vite

Este template ajuda você a começar a desenvolver aplicações com **Vue 3** usando **Vite**.

---

## Configuração recomendada do IDE

Use o **[VS Code](https://code.visualstudio.com/)** com a extensão **Volar** (desative o Vetur caso esteja ativo).

---

## Suporte a Tipos para `.vue` em TypeScript

Como o TypeScript não consegue lidar nativamente com as informações de tipos de componentes `.vue`, elas são tratadas como um tipo genérico de componente Vue por padrão. Na maioria dos casos, isso é suficiente, especialmente se você não precisa de validação avançada de props fora dos templates.

Se você quiser obter os tipos reais de props em `.vue` (por exemplo, ao usar chamadas manuais de `h(...)`), você pode alternar o plugin do Volar pelo **Command Palette** do VS Code:  
`Volar: Switch TS Plugin on/off`.

---

## Personalização da configuração

Para detalhes de configuração do Vite, consulte a documentação oficial: [Vite Configuration Reference](https://vitejs.dev/config/).

---

## Configuração do projeto

1. Instale as dependências:

```bash
npm install
```
2. Copie o template de variáveis de ambiente e preencha com os valores necessários:
```bash
cp env.example .env
```

3. Build para produção (com verificação de tipos e minificação)
```bash
npm run build
```