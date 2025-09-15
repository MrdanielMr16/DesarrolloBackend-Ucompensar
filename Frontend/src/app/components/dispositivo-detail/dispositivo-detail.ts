import { Component,OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../../services/dispositivo';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispositivo-detail',
  standalone: true,  
  imports: [CommonModule, RouterModule, DatePipe, FormsModule],
  templateUrl: './dispositivo-detail.html',
  styleUrl: './dispositivo-detail.css'
})
export class DispositivoDetailComponent implements OnInit {
  imagenSeleccionada: string = '';
  nuevoComentario = { nombre: '', contenido: '' };
  dispositivo: any;
  imagenes: any[] = [];
  comentarios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private dispositivoService: DispositivoService,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  cambiarImagen(url: string) {
    this.imagenSeleccionada = url;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dispositivoService.getDispositivo(+id).subscribe(data => {
        this.dispositivo = data.dispositivo;
        this.imagenes = data.imagenes;
        this.comentarios = data.comentarios;

        // 👇 Asigna la primera imagen como seleccionada
        if (this.imagenes.length > 0) {
          this.imagenSeleccionada = this.imagenes[0].url;
        } else {
          this.imagenSeleccionada = 'assets/no-image.png';
        }
      });
    }
  }

  agregarComentario() {
    if (this.nuevoComentario.nombre && this.nuevoComentario.contenido) {
      this.comentarios.unshift({
        nombre: this.nuevoComentario.nombre,
        contenido: this.nuevoComentario.contenido,
        fecha: new Date()
      });

      // Resetear formulario
      this.nuevoComentario = { nombre: '', contenido: '' };
    }
  }

}