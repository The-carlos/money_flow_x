# money_flow_x

`money_flow_x` es una aplicacion web personal para analizar movimientos financieros, visualizar deuda, entender habitos de gasto y dar seguimiento a la salud financiera.

La aplicacion estara desarrollada completamente en Python. El frontend inicial sera construido con Streamlit y el proyecto usara Poetry para manejar dependencias, entorno virtual y comandos de desarrollo.

## Objetivo

El objetivo principal es convertir informacion financiera personal en vistas claras y accionables:

- ingresos y egresos por periodo,
- movimientos consolidados de debito y credito,
- comportamiento de cuenta de debito,
- comportamiento de tarjeta de credito,
- deuda regular de tarjeta de credito,
- gastos a meses sin intereses,
- seguimiento vivo de gastos registrados manualmente,
- y resumen general de salud financiera.

El sistema esta pensado para uso personal y local. No es una plataforma multiusuario, no es un sistema contable general y no requiere una base de datos en su primera version.

## Dashboard

El dashboard tendra seis secciones principales.

### 1. Resumen

La seccion de resumen debe mostrar una vista general de la situacion financiera.

Debe incluir:

- resumen de tarjeta de credito obtenido desde el PDF del estado de cuenta,
- deuda total,
- pago minimo,
- pago para no generar intereses,
- limite de credito,
- credito disponible,
- saldo o deuda asociada a meses sin intereses,
- graficos de ingresos y egresos de cuenta de debito,
- y comparativas generales por periodo.

### 2. Movimientos

La seccion de movimientos debe mostrar una tabla consolidada con todos los movimientos disponibles.

Debe incluir movimientos de:

- cuenta de debito,
- tarjeta de credito,
- cargos,
- abonos,
- pagos,
- transferencias,
- y movimientos categorizados.

La tabla debe permitir revisar fechas, descripcion, producto, tipo de movimiento, categoria, cargo, abono y saldo calculado cuando aplique.

### 3. Debito

La seccion de debito debe estar dedicada al comportamiento de la cuenta de debito.

Debe permitir visualizar:

- ingresos,
- egresos,
- saldo acumulado,
- gasto por categoria,
- evolucion del saldo,
- y comportamiento por periodo.

### 4. Credito

La seccion de credito debe estar dedicada al comportamiento de la tarjeta de credito.

Debe permitir visualizar:

- compras del periodo,
- pagos realizados,
- deuda regular,
- uso del limite de credito,
- gasto diario,
- gasto por categoria,
- compras contra pagos,
- y cambios entre periodos.

### 5. MSI

La seccion MSI debe estar dedicada a la gestion de gastos a meses sin intereses.

Debe permitir visualizar:

- planes activos,
- monto original,
- saldo pendiente,
- pago requerido del periodo,
- avance del plan,
- total pagado,
- total pendiente,
- y peso de los MSI dentro de la deuda total.

### 6. Tracker

La seccion tracker sera la unica seccion viva del dashboard.

Mientras las demas secciones se alimentan de estados de cuenta precargados en PDF, el tracker se alimenta de registros manuales enviados desde Telegram.

Debe permitir visualizar:

- presupuesto del ciclo actual,
- gastos registrados,
- total gastado,
- disponible restante,
- porcentaje usado,
- gastos por categoria,
- gasto por fecha,
- y estado general del ciclo.

## Fuentes de datos

El sistema tendra dos fuentes principales de datos.

### Estados de cuenta PDF

Los estados de cuenta PDF seran la fuente principal para la informacion historica y consolidada.

Desde ellos se debe obtener:

- movimientos de debito,
- movimientos de credito,
- metricas del estado de cuenta de tarjeta de credito,
- informacion de meses sin intereses,
- periodos procesados,
- y datos base para graficos historicos.

### Telegram

Telegram sera la fuente de datos del tracker.

El bot debe permitir registrar gastos desde el celular y mantener actualizado el ciclo actual de presupuesto. Estos datos deben aparecer en el dashboard sin depender de la carga de un nuevo estado de cuenta.

## Alcance inicial

La primera version del proyecto se enfocara en una aplicacion local, privada y simple.

Incluye:

- aplicacion web con Streamlit,
- procesamiento local de PDFs,
- persistencia local con archivos,
- dashboard con las seis secciones definidas,
- tracker conectado a Telegram,
- manejo de dependencias con Poetry,
- y separacion de responsabilidades usando arquitectura hexagonal.

No incluye en la primera version:

- multiusuario,
- autenticacion,
- despliegue cloud,
- base de datos relacional,
- sincronizacion bancaria automatica,
- integracion directa con bancos,
- ni soporte para multiples instituciones financieras.

## Persistencia inicial

La persistencia inicial sera mediante archivos locales.

Tipos de archivos esperados:

- PDFs originales de estados de cuenta,
- CSVs derivados para movimientos consolidados,
- JSONs derivados para metricas,
- JSONs de estado del tracker,
- y archivos auxiliares para control de procesamiento.

Los datos financieros personales no deben versionarse en git.

## Arquitectura hexagonal

El proyecto seguira arquitectura hexagonal para separar la logica central de los detalles externos.

La aplicacion se organizara alrededor de cuatro conceptos:

- dominio,
- casos de uso,
- puertos,
- adaptadores.

### Dominio

El dominio contiene los conceptos financieros centrales y las reglas que no dependen de herramientas externas.

Conceptos esperados:

- movimiento financiero,
- cuenta,
- tarjeta de credito,
- estado de cuenta,
- periodo,
- categoria,
- plan MSI,
- presupuesto,
- gasto registrado,
- ciclo del tracker,
- metricas financieras.

El dominio no debe depender de Streamlit, Telegram, pandas, pdfplumber, archivos locales, APIs externas ni detalles de infraestructura.

### Casos de uso

Los casos de uso coordinan operaciones del sistema usando entidades del dominio y puertos.

Casos de uso iniciales:

- importar estado de cuenta de debito desde PDF,
- importar estado de cuenta de credito desde PDF,
- detectar planes MSI,
- consolidar movimientos,
- calcular metricas financieras,
- categorizar movimientos,
- consultar datos para el dashboard,
- registrar gasto del tracker,
- consultar estado del tracker,
- actualizar presupuesto del tracker,
- archivar o reiniciar ciclo del tracker.

### Puertos

Los puertos definen las interfaces que la aplicacion necesita para comunicarse con el exterior.

Puertos esperados:

- lector de documentos PDF,
- repositorio de movimientos,
- repositorio de metricas de credito,
- repositorio de planes MSI,
- repositorio del tracker,
- servicio de categorizacion,
- servicio de notificaciones o mensajeria,
- proveedor de fecha/hora,
- y consultas para reportes del dashboard.

Los casos de uso deben depender de estos puertos, no de implementaciones concretas.

### Adaptadores

Los adaptadores implementan los detalles tecnicos.

Adaptadores esperados:

- frontend Streamlit,
- parser de PDFs,
- persistencia en archivos CSV y JSON,
- bot de Telegram,
- clasificador por reglas,
- clasificador externo opcional,
- y loaders para datos procesados.

Los adaptadores pueden usar librerias externas, pero no deben contaminar el dominio con esas dependencias.

## Estructura conceptual

La estructura exacta podra evolucionar, pero el proyecto debe mantener una separacion similar a esta:

```text
money_flow_x/
  src/
    money_flow_x/
      domain/
      application/
      ports/
      adapters/
      config/
  tests/
  data/
    raw/
    processed/
  pyproject.toml
  README.md
```

### `domain`

Contiene entidades, value objects y reglas financieras puras.

### `application`

Contiene casos de uso y servicios de aplicacion que coordinan el flujo del sistema.

### `ports`

Contiene interfaces que describen lo que la aplicacion necesita del exterior.

### `adapters`

Contiene implementaciones concretas de entrada y salida:

- Streamlit,
- Telegram,
- archivos,
- parsers,
- clasificadores.

### `config`

Contiene configuracion de rutas, variables de entorno y parametros de ejecucion.

### `tests`

Contiene pruebas automatizadas para dominio, casos de uso y adaptadores relevantes.

## Reglas de diseno

- Python es el unico lenguaje principal del proyecto.
- Poetry es la herramienta oficial para dependencias y entorno virtual.
- Streamlit es el frontend inicial.
- El dominio no debe importar librerias de infraestructura.
- Los casos de uso no deben conocer detalles de Streamlit ni Telegram.
- La lectura de PDFs debe vivir en adaptadores.
- La persistencia en archivos debe vivir en adaptadores.
- El dashboard debe consultar casos de uso o servicios de aplicacion, no leer archivos directamente cuando exista una abstraccion disponible.
- El bot de Telegram debe registrar eventos usando casos de uso, no escribir directamente el estado final del sistema.
- Los datos financieros personales deben permanecer fuera de git.

## Flujo esperado

### Carga de estados de cuenta

1. El usuario coloca PDFs en una carpeta local.
2. Un caso de uso solicita importar esos documentos.
3. Un adaptador PDF extrae datos crudos.
4. La aplicacion convierte esos datos en entidades del dominio.
5. Los movimientos, metricas y MSI se guardan mediante repositorios.
6. El dashboard consulta datos procesados.

### Registro desde Telegram

1. El usuario registra un gasto desde Telegram.
2. El adaptador de Telegram recibe el mensaje.
3. El adaptador traduce el mensaje a una solicitud de caso de uso.
4. El caso de uso valida y registra el gasto.
5. El repositorio del tracker persiste el nuevo estado.
6. El dashboard muestra el tracker actualizado.

## Configuracion

El proyecto debera usar variables de entorno para configuracion sensible.

Variables esperadas:

```env
TELEGRAM_TOKEN=
TELEGRAM_CHAT_ID=
OPENAI_API_KEY=
OPENAI_MODEL=
```

Las variables relacionadas con clasificadores externos deben ser opcionales. El sistema debe poder funcionar con categorizacion local por reglas cuando no haya credenciales externas configuradas.

## Datos privados

No deben versionarse:

- estados de cuenta PDF,
- datos procesados derivados,
- archivos de tracker,
- tokens,
- llaves de API,
- archivos `.env`,
- ni entornos virtuales.

## Gitflow

El proyecto usara un flujo de trabajo basado en ramas para mantener separados el desarrollo diario, la preparacion de releases y la rama estable.

### Ramas principales

- `main`: rama estable. Solo recibe cambios desde ramas `rc/*`.
- `develop`: rama de integracion. Recibe cambios desde ramas `feature/*`, `fix/*` o `docs/*`.

### Ramas de trabajo

Las nuevas ideas o cambios deben salir desde `develop`.

Convenciones de nombres:

- `feature/nombre-corto`: nuevas funcionalidades.
- `fix/nombre-corto`: correcciones.
- `docs/nombre-corto`: cambios de documentacion.
- `rc/vX.Y.Z`: release candidate antes de integrar a `main`.

Ejemplos:

```text
feature/setup-poetry
feature/domain-movements
feature/pdf-import-credit
fix/tracker-budget-calculation
docs/gitflow
rc/v0.1.0
```

### Flujo de integracion

El flujo esperado es:

```text
feature/* -> develop -> rc/* -> main
```

Reglas:

- No hacer push directo a `main`.
- No hacer push directo a `develop`.
- Todo cambio debe integrarse mediante Pull Request.
- Las ramas `feature/*`, `fix/*` y `docs/*` deben abrir PR contra `develop`.
- Las ramas `rc/*` deben salir desde `develop`.
- Las ramas `rc/*` deben abrir PR contra `main`.
- Despues de integrar una `rc/*` en `main`, se debe crear un tag de version.

### Flujo para una nueva funcionalidad

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-corto
```

Al terminar el cambio:

```bash
git push -u origin feature/nombre-corto
```

Despues se abre un Pull Request:

```text
feature/nombre-corto -> develop
```

### Flujo para una release

```bash
git checkout develop
git pull origin develop
git checkout -b rc/v0.1.0
git push -u origin rc/v0.1.0
```

Despues se abre un Pull Request:

```text
rc/v0.1.0 -> main
```

Cuando el PR se integra en `main`, se crea el tag:

```bash
git checkout main
git pull origin main
git tag v0.1.0
git push origin v0.1.0
```

Si durante la release hubo ajustes directos en `rc/*`, despues del merge a `main` se debe sincronizar `develop`:

```bash
git checkout develop
git pull origin develop
git merge main
git push origin develop
```

### Protecciones recomendadas en GitHub

Para `main`:

- requerir Pull Request antes de merge,
- requerir al menos una aprobacion,
- bloquear push directo,
- requerir que la rama este actualizada antes de merge,
- requerir checks verdes cuando exista CI.

Para `develop`:

- requerir Pull Request antes de merge,
- requerir al menos una aprobacion,
- bloquear push directo,
- requerir checks verdes cuando exista CI.

## Comandos esperados

Los comandos finales podran ajustarse durante la implementacion, pero el proyecto debe tender a un flujo similar:

```bash
poetry install
poetry run streamlit run src/money_flow_x/adapters/inbound/streamlit_app.py
poetry run python -m money_flow_x.adapters.inbound.telegram_bot
poetry run python -m money_flow_x.adapters.inbound.cli import-statements
```

## Estado del proyecto

El proyecto esta en fase inicial de definicion y construccion.

La prioridad inicial es establecer una base clara de producto, arquitectura y flujo de datos antes de implementar las piezas funcionales.
