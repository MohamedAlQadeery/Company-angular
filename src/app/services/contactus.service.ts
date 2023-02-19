import { Injectable } from '@angular/core';
import { Contact } from '../shared/interfaces/ContactDTO';
import { BaseService } from './base/base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactusService extends BaseService<Contact> {
  constructor(_http: HttpClient) {
    super(_http, environment.endPoints.contact);
  }
}
