**RF** => Requisitos Funcionais

**RNF** => Requisitos não Funcionais

**RN** => Regras de Negócio

# Cadastro do carro

**RF** 
- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

**RN** 
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado com disponibilidade verdadeira por padrão.
- Somente usuários admins podem realizar cadastro de carros.
  
# Atualização Cadastral do carro

**RN** 
- Não deve ser possível alterar a placa de um carro já cadastrado. (Update)

# Listagem de carros

**RF** 
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros pelo nome da categoria.
- Deve ser possível listar todos os carros pelo nome da marca.
- Deve ser possível listar todos os carros pelo nome do carro.

**RN**
- O usuário não precisa estar logado no sistema para visualizar os carros disponíveis.

# Cadatro de Especificação no carro

**RF** 
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.
  
**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário admin.

# Cadastro de imagens do carro

**RF**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.
  
**RNF** 
- Utilizar o multer para upload de arquivo.

**RN** 
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário admin.
  
# Aluguel de carro

**RF**
- Deve ser possível cadastrar um aluguel

**RN** 
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
- Usuário deve estar autenticado
- Ao realizar um alguel o status do carro deverá ser alterado para indisponível
  
# Devolução do carro

**RF**
- Deve ser possível realizar a devolução de um carro

**RN** 
- Se o carro for devolvido com menos de 24hr, deverá ser cobrada a diária completa
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
- Ao realizar a devolução, o usuário deverá ser liberado para fazer outro aluguel
- Ao realizar a devolução, deverá ser calculado o total do aluguel
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa por atraso
- Caso haja multa, deverá ser somado ao total
- Usuário deve estar logado na aplicação

# Listagem de aluguéis por usuário

**RF**
- Deve ser possível buscar todos os alugueis realizados pelo usuário

**RN** 
- O usuário deve estar logado na aplicação
