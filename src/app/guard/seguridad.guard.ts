import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const seguridadGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lService = inject(LoginService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado
  const autenticado = lService.verificar();

  if (!autenticado) {
    router.navigate(['/login']);
    return false;
  }

  // Verifica roles si se definen en data
  const rolesPermitidos = route.data['roles'] as string[] | undefined;
  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const rolUsuario = lService.showRole(); // <-- Asegúrate de tener este método en tu LoginService

    if (!rolesPermitidos.includes(rolUsuario)) {
      router.navigate(['/inicio']); // o una página que tú definas
      return false;
    }
  }

  return true;
};
