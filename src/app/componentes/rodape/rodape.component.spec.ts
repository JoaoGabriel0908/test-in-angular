import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RodapeComponent } from "./rodape.component"

describe('RodapeComponent', () => {
    let component: RodapeComponent;
    let fixture: ComponentFixture<RodapeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RodapeComponent]
        })
        fixture = TestBed.createComponent(RodapeComponent);
        component = fixture.componentInstance;
    });

    it('deveria ser criado', () => {
        expect(component).toBeTruthy();
    });

    it('deveria definir as propriedades alt e src', () => {
        expect(component.alt).toBeDefined();
        expect(component.src).toBeDefined();
    });

    it('deveria renderizar o conteúdo baseado nas propriedades src e alt', () => {
        component.src = '../../../assets/imagens/image.png';
        component.alt = 'Imagem de exemplo';

        // Realiza uma fotografia do componente
        expect(component).toMatchSnapshot();
    })
})