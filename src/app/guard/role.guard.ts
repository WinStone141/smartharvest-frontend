import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Primero verificar si está autenticado
  if (!loginService.verificar()) {
    router.navigate(['/login']);
    return false;
  }

  // Obtener el rol del usuario
  const userRole = loginService.showRole();
  
  // Obtener los roles esperados de la configuración de la ruta
  const expectedRoles = route.data?.['expectedRoles'] as string[];
  
  // Si no hay roles configurados, permitir acceso
  if (!expectedRoles || expectedRoles.length === 0) {
    return true;
  }

  // Verificar si el usuario tiene alguno de los roles requeridos
  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  // Si no tiene el rol adecuado, redirigir a inicio
  router.navigate(['/home']);
  return false;
};