import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IaOpenrouterService {
  constructor(private http: HttpClient) {}

  consultarOpenRouter(pregunta: string): Observable<any> {
    const url = 'https://openrouter.ai/api/v1/chat/completions';

    const headers = new HttpHeaders({
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json',
      'Referer': 'http://localhost:4200'  // ✅ cambia aquí
    });

    const body = {
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages: [
        { role: 'system', content: 'Eres un experto en agricultura de precisión. No sabes otras cosas que no tengan que ver con agricultura. Das recomendaciones y predicciones meteorologicas. Limita tus respuestas a maximo 300 caracteres' },
        { role: 'user', content: pregunta }
      ]
    };

    return this.http.post(url, body, { headers });
  }
}
