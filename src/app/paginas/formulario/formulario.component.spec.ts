import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormularioComponent } from "./formulario.component";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterModule } from "@angular/router";
import { LivroService } from "../../services/livro.service";
import { AvaliacaoEstrelasComponent } from "../../componentes/avaliacao-estrelas/avaliacao-estrelas.component";

describe('FormularioComponent', () => {
    let component: FormularioComponent;
    let fixture: ComponentFixture<FormularioComponent>;
    let service: LivroService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormularioComponent, ReactiveFormsModule, RouterLink, RouterModule.forRoot([]), AvaliacaoEstrelasComponent],
            providers: [FormBuilder, LivroService]
        })

        service = TestBed.inject(LivroService);
        fixture = TestBed.createComponent(FormularioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Atualiza o DOM
    })

    it('deveria inicializar o formulário com valores vazios', () => {
        expect(component.formulario.value).toEqual({
            titulo: '',
            autoria: '',
            imagem: '',
            genero: '',
            dataLeitura: '',
            classificacao: null
        })
    })

    it('deveria adicionar um novo livro', () => {
        const novoLivro = {
            titulo: 'O Alquimista',
            autoria: 'Paulo Coelho',
            imagem: 'https://example.com/alquimista.jpg',
            genero: 'romance',
            dataLeitura: '2023-10-01',
            classificacao: 5
        };

        const adicionarLivroSpy = jest.spyOn(service, 'adicionarLivro');
        const routerSpy = jest.spyOn(component['router'], 'navigate')

        component.formulario.setValue(novoLivro);
        component.adicionarLivro();

        // Verifica se o serviço foi chamado com o novo livro
        expect(adicionarLivroSpy).toHaveBeenCalledWith({
            ...novoLivro,
            genero: component.generos.find(g => g.id === novoLivro.genero),
        })

        // Vendo se resetou o formulário
        expect(component.formulario.value).toEqual({
            titulo: null,
            autoria: null,
            imagem: null,
            genero: null,
            dataLeitura: null,
            classificacao: null
        })

        // Verifica se o roteador foi chamado para navegar para a lista de livros
        expect(routerSpy).toHaveBeenCalledWith(['lista-livros']);
    })
})