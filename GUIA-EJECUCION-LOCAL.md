# Gestión de Citas Médicas — Guía Completa

Este documento incluye toda la arquitectura, dependencias, modificaciones de código y comandos necesarios para instalar, configurar y ejecutar de forma independiente este proyecto.

---

## 1. Arquitectura y Stack Tecnológico
El proyecto es una aplicación web completa que integra:
* **Next.js (v16.4.2 con Turbopack):** Framework principal para el frontend y el servidor de desarrollo (`next`).
* **Payload CMS:** Panel administrativo y gestión de colecciones (`Admins`, `Users`, `Specialties`, `DoctorProfiles`, `Availability`, `Appointments`, `AuditEvents`, `Media`, `Folders`, `Tags`).
* **Base de Datos Local (SQLite):** Adaptada mediante `@payloadcms/db-sqlite` para almacenar los datos localmente en `local.db`.

---

## 2. Requisitos Previos del Sistema (Windows)

1. **Node.js (Versión LTS):**
   Instálalo desde PowerShell o Símbolo del sistema (CMD):
   ```powershell
   winget install OpenJS.NodeJS.LTS
   ```
   *(Nota: Cierra y vuelve a abrir la terminal después de instalar Node.js para que el sistema reconozca el comando).*

2. **pnpm (Versión 10):**
   El archivo `package.json` requiere estrictamente las versiones `^9 || ^10 || ^11` (las versiones 12+ generan error `ERR_PNPM_UNSUPPORTED_ENGINE`):
   ```powershell
   npm install -g pnpm@10
   ```
   Verifica la versión instalada:
   ```powershell
   pnpm -v
   ```

---

## 3. Dependencias Instaladas y Adaptación Local

### Paso A: Instalar dependencias base del proyecto
Ubícate en la carpeta raíz del proyecto (`C:\Users\patri\Desktop\App\gestion-citas-medicas`) y ejecuta:
```powershell
pnpm install
```
*(Esto descarga Next.js, React, Payload CMS y todas las librerías definidas en `package.json`).*

### Paso B: Instalar adaptador SQLite local y dotenv
Verifica primero tu versión exacta de `payload`:
```powershell
pnpm list payload
```
Luego instala `dotenv` y `@payloadcms/db-sqlite` haciendo coincidir la versión exacta con `payload` (por ejemplo, si `payload` es `3.79.0`, usa `@payloadcms/db-sqlite@3.79.0`):
```powershell
pnpm add dotenv
pnpm add @payloadcms/db-sqlite@VERSION_EXACTA_DE_PAYLOAD
```

### Paso C: Configuración de variables de entorno (`.env`)
Crea un archivo llamado `.env` en la carpeta raíz del proyecto (`C:\Users\patri\Desktop\App\gestion-citas-medicas\.env`) con codificación UTF-8 ejecutando:
```powershell
Set-Content -Path .env -Value "FIGMA_EID=local-dev`nPAYLOAD_SECRET=local-dev-secret-key-12345`nDATABASE_URI=file:./local.db" -Encoding UTF8
```

---

## 4. Como Ejecutar el Programa en Windows

El script original `pnpm dev` en `package.json` utiliza sintaxis de Mac/Linux (`NODE_OPTIONS=...`), lo cual falla en Windows. Para arrancarlo correctamente:

1. Abre PowerShell o CMD en la carpeta del proyecto:
   ```powershell
   cd C:\Users\patri\Desktop\App\gestion-citas-medicas
   ```
2. Ejecuta Next.js directamente en el puerto 3000:
   ```powershell
   pnpm exec next dev --port 3000 --hostname 0.0.0.0
   ```
3. Abre tu navegador web en las siguientes direcciones:
   * **Aplicación Principal (Frontend):** http://localhost:3000
   * **Panel Administrativo (Payload CMS):** http://localhost:3000/admin

4. **Para detener el servidor:** Haz clic en la ventana de la terminal y presiona `Ctrl + C`.

---

## 5. Lanzador Rápido con Un Clic (`iniciar-app.bat`)
Usar el archivo llamado `iniciar-app.bat` para iniciar la aplicación con doble clic

---

## 6. Solución de Problemas y Respaldo de Datos

* **Limpiar caché si ocurre un error de módulos o compilación:**
  ```powershell
  Remove-Item -Recurse -Force .next
  pnpm exec next dev --port 3000 --hostname 0.0.0.0
  ```
* **Respaldo de información:** Todos los usuarios administradores, pacientes, médicos, especialidades, horarios y citas se guardan automáticamente en el archivo `local.db` ubicado en la raíz del proyecto. Haz una copia de seguridad de este archivo antes de mover o reinstalar el proyecto.
