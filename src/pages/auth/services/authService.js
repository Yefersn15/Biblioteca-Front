// src/pages/auth/services/authService.js
// Reexport delgado de las funciones de auth.api.js que las páginas de este
// módulo llaman directamente (fuera de AuthContext, que ya cubre login/registro).
import * as authApi from '../../../services/api/auth.api';

export const solicitarRecuperacion = authApi.solicitarRecuperacion;
export const verificarToken = authApi.verificarToken;
export const restablecerPassword = authApi.restablecerPassword;
