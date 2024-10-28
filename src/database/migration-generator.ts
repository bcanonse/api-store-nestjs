import { execSync } from 'child_process';

// Obtiene los argumentos de la línea de comandos

const args = process.argv.slice(2);

// Verifica que se haya pasado un nombre

if (args.length === 0) {
  console.error(
    'Por favor, proporciona un nombre para la migración.',
  );

  process.exit(1);
}

const migrationName = args[0]; // Toma el primer argumento

// Comando para generar la migración usando TypeORM

const command = `npm run typeorm migration:generate src/database/migrations/${migrationName}`;

// Ejecuta el comando

try {
  execSync(command, { stdio: 'inherit' });

  console.log(
    `Migración '${migrationName}' generada con éxito.`,
  );
} catch (error) {
  console.error('Error al generar la migración:', error);

  process.exit(1);
}
