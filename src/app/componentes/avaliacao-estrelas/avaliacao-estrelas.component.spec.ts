import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AvaliacaoEstrelasComponent } from "./avaliacao-estrelas.component"
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core";

describe('AvaliaçãoEstrelasComponent', () => {
    let component: AvaliacaoEstrelasComponent;
    let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AvaliacaoEstrelasComponent],
            providers: [
                {
                  provide: NG_VALUE_ACCESSOR,
                  useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
                  multi: true
                }
              ]
        });

        fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
        component = fixture.componentInstance;
        component.readOnly = false; // Permite interações para testes
        fixture.detectChanges(); // Atualiza o DOM
    });

    it('deveria ser criado', () => {
        expect(component).toBeTruthy();
    });

    it('deveria atribuir um valor para a classificação quando o método writeValue for chamado', () => {
        const classificacao = 3;
        component.writeValue(classificacao);
        expect(component.classificacao).toBe(classificacao);
    })

    it('deveria chamar o onChange quando o método classificar for chamado', () => {
        const onChangeSpy = jest.spyOn(component, 'onChange');
        const classificacao = 4;
        component.classificar(classificacao);

        expect(onChangeSpy).toHaveBeenCalled();
    })

    it('deveria chamar o onTouched quando o método classificar for chamado', () => {
        const onTouchedSpy = jest.spyOn(component, 'onTouched');
        const classificacao = 4;
        component.classificar(classificacao);

        expect(onTouchedSpy).toHaveBeenCalled();
    })

    it('não deveria atualizar a classificação quando a propriedade readOnly for true', () => {
        const onChangeSpy = jest.spyOn(component, 'onChange');
        component.readOnly = true; // Define como somente leitura
        const classificacao = 4;
        component.classificar(classificacao);

        // Espera que o onChange não seja chamado e a classificação não seja atualizada
        expect(onChangeSpy).not.toHaveBeenCalled();
        expect(component.classificacao).not.toBe(classificacao);
    })

    it('deveria ignorar valores inválidos e atribuir o valor 1 à classificação', () => {
        const valoresInvalidos = [-6, 0, 'abc', null, -1];
        valoresInvalidos.forEach((valorInvalido) => {
            component.writeValue(valorInvalido as any);
            expect(component.classificacao).toBe(1);
        })
    })

    it('deveria atualizar o DOM quando a classificação muda', () => {
        const classificacao = 2;
        component.classificar(classificacao);

        // fixture.detectChanges(); // Atualiza o DOM

        const estrelaPreenchida = fixture.nativeElement.querySelector('.filled');
        expect(estrelaPreenchida).toBeTruthy();
    })

    it('quando inicializado, a classificação deve ser 1', () => {
        component.writeValue(component.classificacao);
        expect(component.classificacao).toBe(1);
    })
})