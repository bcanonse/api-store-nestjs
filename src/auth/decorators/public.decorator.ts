import { SetMetadata } from '@nestjs/common';

// instanciamos como queremos que se va a llamar la metadata
// lo exportamos por si lo queremos reutilizar en otro decodador y en el guardian
export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () =>
  SetMetadata(IS_PUBLIC_KEY, true);
