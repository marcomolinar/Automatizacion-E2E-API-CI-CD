# Automatizacion-E2E-API-CI-CD (SauceDemo + DummyJSON)

Suite de automatización que combina:
- **BDD (Gherkin) + Cucumber-js + TypeScript**
- **E2E Web (UI) con Playwright**
- **API Testing con Playwright APIRequestContext**
- **CI/CD con GitHub Actions**

Repositorio: https://github.com/marcomolinar/Automatizacion-E2E-API-CI-CD

---

## 1) Objetivo del reto

Validar de forma integral:
- **SauceDemo (Frontend Web)**: login, selección de producto y compra (checkout).
- **DummyJSON (API simulada)**: login de usuarios, validación de token, contrato mínimo y flujo con endpoints (login → users → me).

Además:
- Ejecutar pruebas **localmente** y en **GitHub Actions**
- Publicar reportes como **artifacts** y contar con evidencias en **PDF**

---

## 2) Tecnologías usadas

- Node.js + npm
- TypeScript
- Playwright
- Cucumber-js (@cucumber/cucumber)
- dotenv
- GitHub Actions

---

## 3) Arquitectura de pruebas (Screenplay)

Se implementa una base con patrón **Screenplay** para mantener separación clara entre:
- **Steps BDD**: definición de pasos (delgados)
- **Lógica de negocio**: `src/tasks/*` y `src/questions/*`
- **Actor + Abilities**: `src/actors/*` y `src/ui/*`

Carpetas principales:
- `src/actors/` (Actor)
- `src/ui/` (Abilities, ej. BrowseTheWeb)
- `src/tasks/` (Tasks de negocio)
- `src/questions/` (Questions/validaciones)

---

## 4) Estructura del proyecto (alto nivel)

- `features/`
  - `features/**/*.feature` (escenarios BDD/UI + API)
  - `features/step_definitions/**/*.ts` (step definitions)
- `src/` (base Screenplay: actors/tasks/questions/ui)
- `.github/workflows/run-tests.yml` (pipeline CI/CD)
- `reports/` (reportes HTML generados en CI para Cucumber)
- `evidencias_pipeline/pdfs/` (PDFs de evidencia)

---

## 5) Variables de entorno (.env)

Este proyecto utiliza `.env` para parametrizar URLs/credenciales de prueba.
Ejemplo de variables (ver `.env.example`):

- `SAUCE_URL=https://www.saucedemo.com/`
- `SAUCE_USER=standard_user`
- `SAUCE_PASS=secret_sauce`
- `DUMMYJSON_BASE_URL=https://dummyjson.com`

Notas:
- El archivo `.env` **NO** se versiona (no está trackeado en git).
- Para correr local, crea tu `.env` basado en `.env.example`.

---

## 6) Cómo ejecutar las pruebas (local)

### 6.1) Instalar dependencias
```bash
npm ci