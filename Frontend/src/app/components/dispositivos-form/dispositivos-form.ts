import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dispositivos-form',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './dispositivos-form.html',
  styleUrl: './dispositivos-form.css'
})

export class DispositivosForm  implements OnInit {
  nuevoDispositivo = {
    marca: '',
    modelo: '',
    tipo: '',
    fecha_lanzamiento: '',
    precio: 0,
    especificaciones: ''
  };

  imagenesInput = '';
  editMode = false;   // 👈 detectar si estamos editando
  dispositivoId: number | null = null;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Revisar si hay id en la URL
    this.dispositivoId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.dispositivoId) {
      this.editMode = true;
      // cargar datos del dispositivo
      this.http.get<any>(`http://localhost:3000/api/dispositivos/${this.dispositivoId}`)
        .subscribe(data => {
          const d = data.dispositivo;
          this.nuevoDispositivo = {
            marca: d.marca || '',
            modelo: d.modelo || '',
            tipo: d.tipo || '',
            fecha_lanzamiento: d.fecha_lanzamiento ? d.fecha_lanzamiento.split('T')[0] : '',
            precio: d.precio || 0,
            especificaciones: d.especificaciones || ''
          };

          // 👇 Convertir array de objetos a string separado por comas
          if (data.imagenes && Array.isArray(data.imagenes)) {
            this.imagenesInput = data.imagenes.map((img: any) => img.url).join(', ');
          }
          console.log('Datos recibidos del backend:', data);
        });
    }
  }

  onSubmit() {
    if (this.editMode && this.dispositivoId) {
      // Modo edición → PUT
      this.http.put(`http://localhost:3000/api/dispositivos/${this.dispositivoId}`, this.nuevoDispositivo)
        .subscribe({
          next: () => {
            alert('✅ Dispositivo actualizado correctamente');
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error al actualizar dispositivo:', err);
            alert('❌ Hubo un error al actualizar el dispositivo');
          }
        });
    } else {
      // Modo creación → POST
      this.http.post<any>('http://localhost:3000/api/dispositivos', this.nuevoDispositivo)
        .subscribe({
          next: (dispositivoCreado) => {
            const id = dispositivoCreado.id_dispositivo;
            const imagenes = this.imagenesInput
              ? this.imagenesInput.split(',').map(url => url.trim())
              : [];

            if (imagenes.length > 0) {
              this.http.post(`http://localhost:3000/api/dispositivos/${id}/imagenes`, { urls: imagenes })
                .subscribe({
                  next: () => {
                    alert('✅ Dispositivo y sus imágenes agregados correctamente');
                    this.router.navigate(['/']);
                  },
                  error: (err) => {
                    console.error('Error al subir imágenes:', err);
                    alert('⚠️ Dispositivo creado, pero error al subir imágenes');
                    this.router.navigate(['/']);
                  }
                });
            } else {
              alert('✅ Dispositivo agregado correctamente (sin imágenes)');
              this.router.navigate(['/']);
            }
          },
          error: (err) => {
            console.error('Error al agregar dispositivo:', err);
            alert('❌ Hubo un error al guardar el dispositivo');
          }
        });
    }
  }

  goBack() {
    this.router.navigate(['/']); // Navega a la lista
  }
}
