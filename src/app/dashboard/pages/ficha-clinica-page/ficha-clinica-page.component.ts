import { Component } from '@angular/core';
import { Persona } from 'src/app/interfaces/administracion.interface';
import { FichaClinica } from 'src/app/interfaces/ficha-clinica.interface';
import { FiltroReserva } from 'src/app/interfaces/reserva-turno.interface';
import { AdministracionPacientesDoctoresService } from 'src/app/services/administracion-pacientes-doctores.service';
import { FichaClinicaService } from 'src/app/services/ficha-clinica.service';
import * as XLSX from 'xlsx';
import { ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ficha-clinica-page',
  templateUrl: './ficha-clinica-page.component.html',
  styleUrls: ['./ficha-clinica-page.component.css']
})
export class FichaClinicaPageComponent {
  pacientes: Persona[] = [];
  doctores: Persona[] = [];
  fichas: FichaClinica[] = [];

  filtros: FiltroReserva = {
    doctorId: '',
    pacienteId: '',
    fechaDesde: '',
    fechaHasta: ''
  }

  constructor(
    private admPacienteServices: AdministracionPacientesDoctoresService,
    private fichaClinicaSvc: FichaClinicaService,
  ) { }

  ngOnInit(): void {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes porque los meses comienzan desde 0
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;
    this.filtros.fechaDesde = fechaFormateada;
    this.filtros.fechaHasta = fechaFormateada;
    this.pacientes = this.admPacienteServices.getPersonasFiltro({ tipo: 'paciente' });
    this.doctores = this.admPacienteServices.getPersonasFiltro({ tipo: 'doctor' });

    this.fichaClinicaSvc.cargarFichasClinicas();

    this.fichaClinicaSvc.fichaClinicas$.subscribe(fichas => {
      this.fichas = fichas;
    })
  }

  filtrar() {
    this.fichas = this.fichaClinicaSvc.getFichaClinicasFiltro(this.filtros);
  }

  eliminarFicha(id: string) {
    this.fichaClinicaSvc.eliminarFichaClinica(id);
  }

  exportexcel(): void {
    /* Pass here the table id */
    let element = document.getElementById('ficha-clinica-table');

    // Elimina la columna "Acciones" antes de convertir la tabla en una hoja de cálculo
    if (element) {
      const table = element.cloneNode(true) as HTMLTableElement;
      const actionsColumnIndex = 4; // Cambia este valor según la posición de la columna "Acciones"

      for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].deleteCell(actionsColumnIndex);
      }

      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

      /* Generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* Save to file */
      XLSX.writeFile(wb, 'fichas-clinicas.xlsx');
    }

  }

  imprimirFicha(ficha: any) {
    // Configuración del PDF
    const pdf = new jsPDF({
      orientation: 'portrait',  // 'portrait' para retrato, 'landscape' para paisaje
      unit: 'mm',
      format: 'a4',             // Formato de página: A4 u otros tamaños disponibles
    });

    // Configuración de estilo de texto
    pdf.setFont('Helvetica');   // Fuente
    pdf.setFontSize(12);        // Tamaño de fuente
    pdf.setTextColor(0, 0, 0);  // Color de texto (negro)

    // Márgenes
    const marginLeft = 10;
    const marginRight = 10;
    const marginTop = 10;
    const marginBottom = 10;

    // Contenido del informe
    const content = `
      Informe Clínico
  
      Nombre del paciente: ${ficha.paciente.nombre} ${ficha.paciente.apellido}
      Diagnóstico: ${ficha.diagnostico}
      Doctor: ${ficha.doctor.nombre} ${ficha.doctor.apellido}
      Fecha: ${ficha.fecha}
    `;

    // Dividir el contenido en líneas
    const lines = pdf.splitTextToSize(content, pdf.internal.pageSize.getWidth() - marginLeft - marginRight);

    // Posición inicial y espacio entre líneas
    let y = marginTop;

    // Agregar líneas al PDF
    lines.forEach((line: string) => {
      if (y + 10 > pdf.internal.pageSize.getHeight() - marginBottom) {
        pdf.addPage(); // Agregar una nueva página si la línea no cabe
        y = marginTop;
      }
      pdf.text(line, marginLeft, y);
      y += 10; // Espacio entre líneas
    });

    // Guardar el PDF con un nombre específico
    pdf.save('Informe_Clinico.pdf');
  }


}
