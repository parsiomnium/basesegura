# Política de seguridad

## Reportar una vulnerabilidad

Si encuentras una vulnerabilidad de seguridad en el código o la infraestructura de Base Segura, no abras un issue público.

Envía un correo a: **security@basesegura.org** (pendiente de activar — mientras tanto, usa un [issue privado](https://github.com/parsiomnium/basesegura/security/advisories/new) en GitHub).

Incluye:

- Descripción del problema
- Pasos para reproducirlo
- Impacto potencial

Responderé en un máximo de 72 horas.

## Alcance

Esta política cubre:

- El código fuente del sitio (este repositorio)
- La infraestructura de deploy (Cloudflare Pages)
- El worker de verificación de sitios

No cubre:

- Errores en el contenido de los artículos (usa un issue normal para eso)
- Servicios de terceros mencionados en los artículos

## Versiones soportadas

Solo la versión desplegada en producción (rama `main`) recibe correcciones de seguridad.
