import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  TeamMember,
  TeamMemberToFormData,
} from '../shared/interfaces/TeamMember';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService extends BaseService<TeamMember> {
  constructor(_http: HttpClient) {
    super(_http, environment.endPoints.teamMember);
  }

  public override Create(model: TeamMember): Observable<any> {
    return this._http.post(`${this.baseUrl}`, TeamMemberToFormData(model));
  }

  public override Update(model: TeamMember, id: number): Observable<any> {
    return this._http.put(
      `${this.baseUrl}/${model.id}`,
      TeamMemberToFormData(model)
    );
  }
}