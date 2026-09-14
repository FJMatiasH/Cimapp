import { cimasService } from './cimas.service';
import { TipoLista, UserLists, PopulatedUserLists, ToggleListResponse } from '../models/userLists.model';

export class UserListsService {
  // Estado inicial simulado para ofrecer una experiencia interactiva inmediata
  private lists: UserLists = {
    favoritas: ['mulhacen', 'aneto'],
    guardadas: ['teide'],
    hechas: ['penalara']
  };

  public getLists(populate = false): UserLists | PopulatedUserLists {
    if (!populate) {
      return { ...this.lists };
    }

    const allCimas = cimasService.getAllRaw();
    const cimasMap = new Map(allCimas.map(c => [c.id, c]));

    return {
      favoritas: this.lists.favoritas.map(id => cimasMap.get(id)!).filter(Boolean),
      guardadas: this.lists.guardadas.map(id => cimasMap.get(id)!).filter(Boolean),
      hechas: this.lists.hechas.map(id => cimasMap.get(id)!).filter(Boolean),
    };
  }

  public toggle(cimaId: string, listType: TipoLista): ToggleListResponse {
    const list = this.lists[listType];
    const index = list.indexOf(cimaId);
    let active = false;

    if (index >= 0) {
      list.splice(index, 1);
      active = false;
    } else {
      list.push(cimaId);
      active = true;
    }

    return {
      cimaId,
      listType,
      active,
      lists: { ...this.lists }
    };
  }

  public add(cimaId: string, listType: TipoLista): UserLists {
    if (!this.lists[listType].includes(cimaId)) {
      this.lists[listType].push(cimaId);
    }
    return { ...this.lists };
  }

  public remove(cimaId: string, listType: TipoLista): UserLists {
    this.lists[listType] = this.lists[listType].filter(id => id !== cimaId);
    return { ...this.lists };
  }
}

export const userListsService = new UserListsService();
