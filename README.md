# Biblioteca-Front

Cliente web del proyecto Biblioteca: React 19 + Vite + React Router, consumiendo la API de [Biblioteca-Back](../Biblioteca-Back).

## Primer arranque

1. Instala dependencias:
   ```
   npm install
   ```
2. Crea un archivo `.env` en la raíz con la URL de la API:
   ```
   VITE_API_URL=http://localhost:4000/api
   ```
3. Levanta el servidor de desarrollo:
   ```
   npm run dev
   ```
   La app queda en `http://localhost:5173` (Vite elige otro puerto libre si ese está ocupado).

Otros scripts: `npm run build` (build de producción), `npm run preview` (sirve el build) y `npm run lint` (ESLint).

## Estructura

```
src/
  components/          compartido entre ≥2 módulos: Layout, AdminLayout, Rutas,
                        PrivateRoute, AdminTable, Pagination, PasswordRequisitos,
                        BrandIcon (ícono de marca, "Folio")...
    header/             Navbar, TopBar, ThemeToggleButton, UserMenu,
                        MenuPersonalizarLayout (usados por Header.jsx y AdminLayout.jsx)
    upload/             ImageUploadField y afines
  context/             AuthContext (sesión/JWT), ConfiguracionContext (tema, institución),
                        ToastContext, ConfirmContext, AyudaContext (botón de ayuda flotante)
  hooks/               compartidos: useModoOscuro, usePaginacion, useBusquedaOrden,
                        useAyudaPagina (registra el texto de ayuda de cada página)...
  pages/<módulo>/      una carpeta por módulo (libros, autores, editoriales,
                        categorias, prestamos, usuarios, banners, auth, home, dashboard)
    components/         piezas de UI propias del módulo (filtros, filas de tabla, campos de formulario)
    hooks/              lógica de datos/estado propia del módulo
    services/           llamadas a la API propias del módulo
    validations/         validaciones propias del módulo, si no son genéricas
  services/api/        cliente axios (client.js, interceptores de token) + *.api.js por recurso
  utils/               compartidos: tema.js (resuelve paleta clara/oscura), color.js, horario.js...
  validations/         compartidas: password.js (regla de contraseña fuerte), isbn.js
```

**Convención de ubicación:** si una pieza (componente, hook, servicio, validación) la usa un solo módulo, vive dentro de `pages/<módulo>/`. Si la usan dos o más módulos, sube a su equivalente en la raíz de `src/`.

## Roles y rutas

Los roles vienen del backend: `USUARIO`, `BIBLIOTECARIO`, `ADMIN`. `PrivateRoute` (`src/components/PrivateRoute.jsx`) controla el acceso:

- Rutas públicas (catálogo, login, registro, recuperación de contraseña, `/nosotros`) bajo `Layout` + `Header`.
- `/perfil` y `/mis-prestamos` requieren sesión iniciada (cualquier rol).
- `/admin/*` requiere rol `BIBLIOTECARIO` o `ADMIN` (`staffOnly`), y usa `AdminLayout` en vez del header público.
- `/login`, `/registro`, `/recuperar-password` y `/restablecer-password` son `requireGuest`: si ya hay sesión, redirigen en vez de mostrarse.

La sesión se guarda como JWT en `localStorage` (`AuthContext.jsx`); el cliente axios (`services/api/client.js`) lo adjunta en cada petición y limpia la sesión local si el backend responde 401.

## Tema claro/oscuro

`ConfiguracionContext` resuelve la paleta activa (clara, oscura o personalizada desde `/admin/configuracion`) a variables CSS (`--tema-fondo`, `--tema-superficie`, `--tema-acento`, etc.) vía `utils/tema.js`, consumidas en `index.css` y en clases utilitarias como `tema-encabezado`, `tema-acento-bg`.

## Ayuda contextual

Cada página llama `useAyudaPagina({ titulo, contenido })` al montarse para registrar su propio texto de ayuda. `AyudaContext` (montado una sola vez en `main.jsx`, junto a los demás providers) dibuja con eso un botón flotante fijo (esquina inferior derecha) presente en toda la app; al pulsarlo se abre un panel lateral con el texto de la página activa, que cambia solo al navegar.

## Préstamos (admin)

Además de aprobar/rechazar/devolver solicitudes hechas en línea, `/admin/prestamos` tiene "Registrar préstamo" para uno presencial: un modal con `BuscadorSelect` (campo de texto que filtra una lista ya cargada y muestra resultados en un desplegable, usado tanto para elegir el usuario como el libro). Si quien pide el libro no tiene cuenta, se cambia a "Usuario nuevo" y se ingresan sus datos ahí mismo; el backend crea la cuenta en el mismo paso (ver README de Biblioteca-Back).
