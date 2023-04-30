import { EmpleadoService } from './../empleado.service';
import { Empleado } from './../empleado';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados:Empleado[];

  constructor(private empleadoServicio:EmpleadoService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  actualizarEmpleado(id:number){
    this.router.navigate(['actualizar-empleado',id]);
  }

  private obtenerEmpleados(){
    this.empleadoServicio.obtenerListaDeEmpleados().subscribe(dato => {
      this.empleados = dato;
    });
  }

  eliminarEmpleado(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar al empleado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
          this.empleadoServicio.eliminarEmpleado(id).subscribe(dato => {
          console.log(dato);
          this.obtenerEmpleados();
	         swalWithBootstrapButtons.fire(
          'Empleado eliminado',
          'El empleado ha sido eliminado con exito',
          'success'
          )}
      )}
    })
  }
  /*
  eliminarEmpleado(id:number){
    this.empleadoServicio.eliminarEmpleado(id).subscribe(dato =>{
      this.obtenerEmpleados();
    })
  }
*/
  verDetallesDelEmpleado(id:number){
    this.router.navigate(['empleado-detalles',id]);
  }
}
