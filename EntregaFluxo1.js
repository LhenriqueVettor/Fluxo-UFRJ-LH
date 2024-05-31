const readline = require('readline-sync');
//Definição das classes do sistema
class Pedido {
    constructor(id, idCliente, status, dataPedido,objeto,quantidade) {
        this.id = id;
        this.idCliente = idCliente;
        this.status = status;
        this.dataPedido = dataPedido;
        this.objeto = objeto;
        this.quantidade =  quantidade;
    }
}

class Funcionario {
    constructor(id, nomeUsuario, cpf, email, senha) {
        this.id = id;
        this.nomeUsuario = nomeUsuario;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Cliente {
    constructor(id, nome, dataNascimento, cpf, email, senha) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Produto {
    constructor(nome, descricao, dataValidade, preco, quantidadeEstoque) {
        this.nome = nome;
        this.descricao = descricao;
        this.dataValidade = dataValidade;
        this.preco = preco;
        this.quantidadeEstoque = quantidadeEstoque;
    }
}
//Classe sistema contem os métodos/funções a serem aplicados
class Sistema {
    constructor() {
        this.clientes = [];
        this.funcionarios = [];
        this.pedidos = [];
        this.produtos = [];
        this.usuarioLogado = null;
        this.avaliacoes = [];
    }
//método de login
    fazerLogin() {
        const tipo = readline.question('Insira a sua funcao (cliente/funcionario): ');
        const email = readline.question('Email: ');
        const senha = readline.question('Senha: ');

        let usuario;
        if (tipo === 'cliente') {
            usuario = this.clientes.find(cliente => cliente.email === email && cliente.senha === senha);
        } else if (tipo === 'funcionario') {
            usuario = this.funcionarios.find(funcionario => funcionario.email === email && funcionario.senha === senha);
        }

        this.usuarioLogado = usuario
    }
///Método de fazer o cadastro
    fazerCadastro() {
        const tipo = readline.question('Voce deseja se cadastrar como cliente ou funcionario? (cliente/funcionario): ');
        const id = readline.question('ID: ');
        const nome = readline.question('Nome: ');
        const cpf = readline.question('CPF: ');
        const email = readline.question('Email: ');
        const senha = readline.question('Senha: ');
///checar o tipo de usuario e encaminhar as questões especificas
        if (tipo === 'cliente') {
            const dataNascimento = readline.question('Insira a data de nascimento:');
            const novoCliente = new Cliente(id, nome, dataNascimento, cpf, email, senha);
            this.clientes.push(novoCliente);
            console.log('Cadastrado com sucesso! - Cliente ', this.usuarioLogado.nome );
        } else if (tipo === 'funcionario') {
            const novoFuncionario = new Funcionario(id, nome, cpf, email, senha);
            this.funcionarios.push(novoFuncionario);
            console.log('Cadastrado com sucesso! - Funcionário ', this.usuarioLogado.nome );
        }
    }
//Apenas sair do código 
    sair() {
        this.usuarioLogado = null;
        console.log('Usuário deslogado com sucesso!');
    }
//método para ver os dados do usuario
    verMeusDados() {
        if (this.usuarioLogado) {
            console.log(this.usuarioLogado);
        } 
    }

    //método para refazer os dados de cliente
    modificarMeusDadosCliente() {
        if (this.usuarioLogado) {
            const nome = readline.question(`Nome (${this.usuarioLogado.nome}): `);
            const cpf = readline.question(`cpf:(${this.usuarioLogado.cpf}):`);
            const dataNascimento = readline.question(`Data de nascimento(${this.usuarioLogado.dataNascimento}):`)
            const email = readline.question(`Email (${this.usuarioLogado.email}): `);
            const senha = readline.question('Senha:');
            
            this.usuarioLogado.dataNascimento = dataNascimento;
            this.usuarioLogado.nome = nome;
            this.usuarioLogado.cpf = cpf;
            this.usuarioLogado.email = email;
            this.usuarioLogado.senha = senha;
            console.log('Dados atualizados!');
        } else {
            console.log('Nenhum usuário logado!');
        }
    }
    //método para refazer os dados de funcionario
    modificarMeusDadosFuncionario() {
        if (this.usuarioLogado) {
            const nome = readline.question(`Nome (${this.usuarioLogado.nome}): `);
            const cpf = readline.question(`cpf:(${this.usuarioLogado.cpf}):`);
            const email = readline.question(`Email (${this.usuarioLogado.email}): `);
            const senha = readline.question('Senha:');
            

            this.usuarioLogado.nome = nome;
            this.usuarioLogado.cpf = cpf
            this.usuarioLogado.email = email;
            this.usuarioLogado.senha = senha;
            console.log('Dados atualizados!');
        } else {
            console.log('Nenhum usuário logado!');
        }
    }
    //adicionar o produto 
    adicionarProduto() {
        if (this.usuarioLogado) {
            const nome = readline.question('Nome do produto: ');
            const descricao = readline.question('Descricao: ');
            const dataValidade = readline.question('Data de validade do produto:: ');
            const preco = readline.questionFloat('Preco: ');
            const quantidadeEstoque = readline.questionInt('Quantidade no estoque: ');

            const novoProduto = new Produto(nome, descricao, dataValidade, preco, quantidadeEstoque);
            this.produtos.push(novoProduto);
            console.log('Produto adicionado!');
        } else {
            console.log('Permissão negada');
        }
    }


    ///Fazer o pedido
    fazerPedido() {
        if (this.usuarioLogado) {
            const idPedido = readline.question('ID do pedido: ');
            const objeto = readline.question('Insira o produto:');
            const idCliente = this.usuarioLogado.id;
            const dataPedido = new Date();
            const status = 'Pendente';
            const quantidade = readline.question('Insira a quantidade:');

            const novoPedido = new Pedido(idPedido, idCliente, status, dataPedido,objeto,quantidade);
            this.pedidos.push(novoPedido);
            console.log('Pedido realizado com sucesso!');
        } 
    }
    //Ver produtos
    VerListaProduto() {
        if (this.usuarioLogado) {
        console.log('Lista dos produtos:');
        console.log(this.produtos.sort());
    }
}
    //Ver clientes
    VerClientes() {
        if (this.usuarioLogado) {
            console.log('Lista de clientes:');
            console.log(this.clientes.sort());
        }
    }
    //Mudar status do pedido
    MudarStatusPedido() {
        const idPedido = readline.question('Insira o id do pedido:');
        const pedido = this.pedidos.find(pedido => pedido.id === idPedido);
        if (pedido) {
            console.log(`Status atual: ${pedido.status}`);
            const novoStatus = readline.question('Insira o novo status do pedido (pendente, adiado, realizado, cancelado):');
            pedido.status = novoStatus;
            console.log('Status do pedido atualizado com sucesso!');
        } else {
            console.log('Pedido não encontrado!');
    }
}
    //editar produto
    EditarProduto() {
        const nomeProd = readline.question('Insira o nome do produto a ser editado:');
        const produto = this.produtos.find(produto => produto.nome === nomeProd);
        if (produto) {
            console.log(`Editando produto: ${produto.nome}`);
            produto.nome = readline.question(`Nome ${produto.nome}: `);
            produto.descricao = readline.question(`Descrição ${produto.descricao}`);
            produto.dataValidade = readline.question(`Data de Validade ${produto.dataValidade} `);
            produto.preco = readline.questionFloat(`Preço R$ ${produto.preco}`);
            produto.quantidadeEstoque = readline.questionInt(`Quantidade em Estoque ${produto.quantidadeEstoque}`);

            console.log('Produto editado com sucesso!!');

        }
        else {
            console.log('O produto não existe!');
        }
    }
    //Ver pedidos
    Verpedidos() {
        console.log('Lista dos pedidos:');
        console.log(this.pedidos);
    }
    //Ver meus pedidos
    VerMeuspedidos() {
        const idCliente = readline.question('Insira o seu id:');
        const pedido = this.pedidos.find(pedido => pedido.idCliente === this.usuarioLogado.id);
        if (pedido) {
            console.log('Lista com seus pedidos:');
            console.log(this.avaliacoes.find(pedido => pedidos.nome === idCliente));
        }
        else {
            console.log('Pedidos não encontrados!');
       }
    }
    //excluir produto
    ExcluirProduto() {
        const Nomeproduto = readline.question('Insira o nome do produto a ser excluido:');
        const produtoExcluir = this.produtos.find(produto => produto.nome === Nomeproduto);
        if (produtoExcluir) {
            this.produtos.splice(produtoExcluir,1);
            console.log('Produto excluido!');
        } else {
            console.log('Produto não encontrado!');
        }
    }
    //avaliar
    Avaliar() {
        console.log('Lista dos pedidos:');
        console.log(this.pedidos);
        const idPedido = readline.question('Insira o ID do pedido a ser avaliado:');
        const pedido = this.pedidos.find(pedido => pedido.id === idPedido);
        if (pedido) {
            const Nota = readline.question('Insira a nota do pedido');
            const NovaAvalicao = new avaliacao(this.usuarioLogado.id,pedido,Nota); 
            this.avaliacoes.push(NovaAvalicao);
            console.log('Avaliação feita!');
        }
        else {
            console.log('Pedido não encontrado');
        }
    }
    //ver avaliação
    VerAvaliacoes() {
        console.log('Lista de avaliações');
        console.log(this.avaliacoes);
    }

    //Cancelar pedido
    CancelarPedido() {
        const idPedido = readline.question('Insira o ID do pedido a ser cancelado:');
        const pedido = this.pedidos.find(pedido => pedido.id === idPedido && pedido.idCliente === this.usuarioLogado.id);
    if (pedido) {
        pedido.status = 'Cancelado';
    
    } else{
        console.log('Não encontrei o pedido');
    }
    }
}


// O usuário precisa ser o sistema
const sistema = new Sistema();

//O MENU
let opcao;
do {
    console.log('1. Fazer login');
    console.log('2. Fazer cadastro');
    console.log('3. Sair');
//Caso o usuário esteja logado:
    if (sistema.usuarioLogado) {
        console.log('4. Ver meus dados');
        console.log('5. Modificar meus dados');
        //se o usuario for funcionario
        if (sistema.usuarioLogado instanceof Funcionario) {
            console.log('6. Ver lista de pedidos');
            console.log('7. Ver lista de produtos');
            console.log('8. Ver lista de clientes ');
            console.log('9. Mudar status do pedido');
            console.log('10. Add produto');
            console.log('11. Editar produto');
            console.log('12. Excluir produto')
        }
        //se o usuario for cliente 
        if (sistema.usuarioLogado instanceof Cliente) {
            console.log('6. Ver lista de produtos');
            console.log('7. Fazer pedido');
            console.log('8. Cancelar pedido');
            console.log('9. Ver meus pedidos')
            console.log('10. Avaliar pedido');
            console.log('11. Visualizar avaliações');
        }
    }

    opcao = readline.questionInt('Escolha uma opcao: ');
    //padrão de saidas possiveis pelo menu
    if (opcao === 1) {
        sistema.fazerLogin();
    } else if (opcao === 2) {
        sistema.fazerCadastro();
    } 
    else if (opcao === 3) {
        sistema.sair();
    } 
    else if (opcao === 4 && sistema.usuarioLogado) {
        sistema.verMeusDados();
    }
    // Caso seja funcionario
     else if (opcao === 5 && sistema.usuarioLogado instanceof Funcionario) {
    sistema.modificarMeusDadosFuncionario();
     }

    else if (opcao === 6 && sistema.usuarioLogado instanceof Funcionario) {
        sistema.Verpedidos();
    } 
    else if (opcao === 7 && sistema.usuarioLogado instanceof Funcionario) {
        sistema.VerListaProduto();
    } 
    else if (opcao === 8 && sistema.usuarioLogado instanceof Funcionario) {
        sistema.VerClientes();
    } 
    else if (opcao === 9 && sistema.usuarioLogado instanceof Funcionario) {
        sistema.MudarStatusPedido();
    } 
    else if (opcao === 10 && sistema.usuarioLogado instanceof Funcionario) {
        sistema.adicionarProduto();
    }  else if (opcao === 11 && sistema.usuarioLogado instanceof Funcionario) {
        sistema.EditarProduto();
    }  else if (opcao === 12 && sistema.usuarioLogado instanceof Funcionario) {
        sistema.ExcluirProduto();
    } 
    //Caso seja cliente
     else if (opcao === 5 && sistema.usuarioLogado instanceof Cliente) {
    sistema.modificarMeusDadosCliente();
    }
    else if (opcao === 6 && sistema.usuarioLogado instanceof Cliente) {
        sistema.VerListaProduto();
    } else if (opcao === 7 && sistema.usuarioLogado instanceof Cliente) {
        sistema.fazerPedido();
    } else if (opcao === 8 && sistema.usuarioLogado instanceof Cliente) {
        sistema.CancelarPedido();
    } else if (opcao === 9 && sistema.usuarioLogado instanceof Cliente) {
        sistema.VerMeuspedidos();
    } else if (opcao === 10 && sistema.usuarioLogado instanceof Cliente) {
        sistema.Avaliar();
    } else if (opcao === 11 && sistema.usuarioLogado instanceof Cliente) {
        sistema.VerAvaliacoes();
    } else {
        console.log('Opcao inválida');
    }
} while (opcao !== 3);
