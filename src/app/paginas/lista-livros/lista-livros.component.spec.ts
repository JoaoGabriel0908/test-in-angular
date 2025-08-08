import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LivroService } from '../../services/livro.service';
import { ListaLivrosComponent } from './lista-livros.component';

describe('ListaLivrosComponent', () => {
  let component: ListaLivrosComponent;
  let fixture: ComponentFixture<ListaLivrosComponent>;
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [FormBuilder, LivroService],
    });
    fixture = TestBed.createComponent(ListaLivrosComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LivroService);
    fixture.detectChanges();
  });

  it('deveria ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deveria renderizar uma seção para cada gênero', () => {
    const generos = fixture.nativeElement.querySelectorAll('.generos');
    expect(generos.length).toBe(component.generos.length);
  });

  it('deveria renderizar um livro para cada gênero', () => {
    component.generos.forEach((genero) => {
      const livros = fixture.nativeElement.querySelectorAll(`.${genero.id} app-livro`);
      expect(livros.length).toBe(service.obterLivrosPorGenero(genero.id).length);
    });
  });

  it('deveria renderizar um botão para criar um novo card', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Criar novo card');
  });
});