import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DispositivoService } from '../../services/dispositivo';

@Component({
  selector: 'app-dispositivos-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dispositivos-list.html',
  styleUrls: ['./dispositivos-list.css']   // 👈 corregido
})
export class DispositivosListComponent implements OnInit {
  dispositivos: any[] = [];

  tiposDisponibles: string[] = [];

  // filtros
  filtroTexto: string = '';
  filtroTipo: string = '';
  ordenPrecio: string = '';

  constructor(private dispositivoService: DispositivoService) {}

  ngOnInit(): void {
    this.dispositivoService.getDispositivos().subscribe(data => {
      this.dispositivos = data,
      this.tiposDisponibles = [...new Set(data.map(d => d.tipo))];
    });
  }

   get dispositivosFiltrados() {
    let lista = [...this.dispositivos];

    // filtrar por texto
    if (this.filtroTexto) {
      lista = lista.filter(d =>
        d.modelo.toLowerCase().includes(this.filtroTexto.toLowerCase())
      );
    }

    // filtrar por tipo
    if (this.filtroTipo) {
      lista = lista.filter(d => d.tipo === this.filtroTipo);
    }

    // ordenar por precio
    if (this.ordenPrecio === 'asc') {
      lista.sort((a, b) => a.precio - b.precio);
    } else if (this.ordenPrecio === 'desc') {
      lista.sort((a, b) => b.precio - a.precio);
    }

    return lista;
  }

  eliminarDispositivo(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este dispositivo?')) {
      this.dispositivoService.deleteDispositivo(id).subscribe(() => {
        this.dispositivos = this.dispositivos.filter(d => d.id_dispositivo !== id);
      });
    }
  }

  editarDispositivo(id: number): void {
    // aquí solo navegamos al formulario para actualizar
    // puedes enviar el ID en la ruta
    window.location.href = `/dispositivos/editar/${id}`;
  }

}


