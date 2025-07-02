import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../../models/role';
import { Users } from '../../../models/users';

@Component({
  selector: 'app-insertarnuevousuario',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './insertarnuevousuario.component.html',
  styleUrl: './insertarnuevousuario.component.css',
})
export class InsertarnuevousuarioComponent implements OnInit {
  roleForm: FormGroup;
  availableRoleTypes: any[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private roleService: RoleService,
    private loginService: LoginService
  ) {
    this.roleForm = this.fb.group({
      selectedRoleType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAvailableRoleTypes();
  }

  /**
   * Define los tipos de roles disponibles para selección
   * No usa IDs hardcodeados porque cada usuario tiene su propio rol
   */
  loadAvailableRoleTypes(): void {
    this.availableRoleTypes = [
      {
        type: 'AGRICULTOR',
        description: 'Gestiona cultivos, parcelas e insumos agrícolas',
        icon: 'agriculture'
      },
      {
        type: 'DUEÑO_DE_MERCADO',
        description: 'Administra mercados locales y sus operaciones',
        icon: 'store'
      }
    ];
  }

  /**
   * Crea un nuevo rol del tipo seleccionado para el usuario actual
   */
  assignRole(): void {
    if (this.roleForm.invalid) {
      return;
    }

    this.isLoading = true;
    const selectedRoleType = this.roleForm.get('selectedRoleType')?.value;
    
    // Crear el objeto Role según tu modelo
    const newRole = new Role();
    newRole.rol = selectedRoleType; // Usar "rol" no "authority"
    newRole.user = new Users(); // El backend debería asignar el usuario actual
    
    // Crear el nuevo rol usando el endpoint POST /roles
    this.roleService.insert(newRole).subscribe({
      next: () => {
        // Mostrar mensaje de éxito
        alert('Rol asignado exitosamente. ¡Bienvenido a SmartHarvest!');
        
        // Redirigir al dashboard
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error('Error al asignar rol:', error);
        alert('Error al asignar el rol. Inténtalo nuevamente.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Navega de vuelta al login
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Obtiene el icono correspondiente al tipo de rol
   */
  getRoleIcon(roleType: string): string {
    const role = this.availableRoleTypes.find(r => r.type === roleType);
    return role ? role.icon : 'person';
  }

  /**
   * Obtiene la descripción del tipo de rol
   */
  getRoleDescription(roleType: string): string {
    const role = this.availableRoleTypes.find(r => r.type === roleType);
    return role ? role.description : 'Usuario del sistema';
  }

  /**
   * Verifica si un tipo de rol está seleccionado
   */
  isRoleSelected(roleType: string): boolean {
    return this.roleForm.get('selectedRoleType')?.value === roleType;
  }

  /**
   * Selecciona un tipo de rol
   */
  selectRoleType(roleType: string): void {
    this.roleForm.patchValue({ selectedRoleType: roleType });
  }
}
