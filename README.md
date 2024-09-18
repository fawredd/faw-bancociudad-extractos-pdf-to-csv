# Extracción de datos de Extractos Bancarios para empresas del Banco Ciudad de Buenos Aires

Este proyecto tiene como objetivo extraer datos de extractos bancarios mensuales en formato PDF del Banco Ciudad de Buenos Aires y volcar toda la información extraída en un archivo CSV, ordenando los movimientos por fecha cronológica.

## Descripción

El código está diseñado para leer múltiples archivos PDF que contienen extractos bancarios, extraer la información relevante (fechas y movimientos) y generar un archivo CSV con los datos organizados.

## Requisitos

- Node.js (versión 12 o superior)
- npm (gestor de paquetes de Node)

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu_usuario/nombre_del_repositorio.git
   ```
##Estructura del Proyecto:
/tu_proyecto
│
├── /pdfs               # Carpeta donde se almacenarán los archivos PDF
│
├── index.js            # Archivo principal que contiene el código de extracción
│
└── movimientos.csv     # Archivo de salida que contendrá los datos extraídos

##Uso

Coloca tus archivos PDF de extractos bancarios en la carpeta pdfs.
Ejecuta el script:
  ``` bash
  node index.js
  ```
Al finalizar, se generará un archivo movimientos.csv en el directorio raíz del proyecto
