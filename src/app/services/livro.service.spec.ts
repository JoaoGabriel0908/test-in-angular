// Padrao AAA
import { GeneroLiterario, Livro } from "../componentes/livro/livro";
import { livros } from "../mock-livros";
import { ErroGeneroLiterario, LivroService } from "./livro.service"

// Criar um cenário de teste (contexto)
describe('LivroService', () => {
    let service: LivroService;

    // Executado antes de cada teste
    beforeEach(() => {
        service = new LivroService();
    })

    // Verificar se o serviço é criado corretamente
    it('service deveria ser criado', () => {
        // Expectativa: o serviço deve ser instanciado
        expect(service).toBeTruthy();
    });

    it('deveria adicionar um novo livro', () => {
        // Cenário: criar um novo livro
        const novoLivro: Livro = {
            titulo: 'O Alquimista',
            autoria: 'Paulo Coelho',
            imagem: 'https://example.com/alquimista.jpg',
            genero: { id: 'romance', value: 'Romance' },
            dataLeitura: '2023-10-01',
            classificacao: 5
        };

        service.adicionarLivro(novoLivro);
        const livrosPorGenero = service.obterLivrosPorGenero('romance');
        expect(livrosPorGenero).toContain(novoLivro);
    });

    it('deveria recuperar corretamente os livros por gênero', () => {
        // Cenário: obter livros do gênero 'romance'
        const livrosPorGenero = service.obterLivrosPorGenero('romance');
        const livrosEsperados = livros.filter(livro => livro.genero.id === 'romance');
        expect(livrosPorGenero).toEqual(livrosEsperados);
    });

    it('deveria inicializar os gêneros corretamente', () => {
        const generosEsperados: GeneroLiterario[] = [
            { id: 'romance', value: 'Romance' },
            { id: 'misterio', value: 'Mistério' },
            { id: 'fantasia', value: 'Fantasia' },
            { id: 'ficcao-cientifica', value: 'Ficção Científica' },
            { id: 'tecnicos', value: 'Técnicos' }
        ]

        expect(service.generos).toEqual(generosEsperados);
    });

    it('deveria lançar um erro ao tentar cadastrar um livro com gênero desconhecido', () => {
        const novoLivro: Livro = {
            titulo: 'Livro Desconhecido',
            autoria: 'Autor Desconhecido',
            imagem: 'https://example.com/desconhecido.jpg',
            genero: { id: 'desconhecido', value: 'Desconhecido' },
            dataLeitura: '2023-10-01',
            classificacao: 3
        };

        expect(() => service.adicionarLivro(novoLivro)).toThrow(ErroGeneroLiterario);
    })
})