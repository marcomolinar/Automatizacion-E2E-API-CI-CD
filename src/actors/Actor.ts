export class Actor {
  private abilities = new Map<string, unknown>();

  constructor(public readonly name: string) {}

  /**
   * Asigna una habilidad al actor (Screenplay: Ability).
   * Ej: actor.can(new BrowseTheWeb(page))
   */
  can(ability: object): this {
    this.abilities.set(ability.constructor.name, ability);
    return this;
  }

  /**
   * Obtiene una habilidad por clase.
   * Ej: actor.abilityTo(BrowseTheWeb)
   */
  abilityTo<T>(AbilityClass: new (...args: any[]) => T): T {
    const ability = this.abilities.get(AbilityClass.name);
    if (!ability) {
      throw new Error(`Actor "${this.name}" no tiene la habilidad: ${AbilityClass.name}`);
    }
    return ability as T;
  }

  /**
   * Ejecuta tareas (Screenplay: Task/Performable).
   */
  async attemptsTo(...tasks: Array<(actor: Actor) => Promise<void>>): Promise<void> {
    for (const task of tasks) {
      await task(this);
    }
  }

  /**
   * Hace una pregunta (Screenplay: Question).
   */
  async asks<T>(question: (actor: Actor) => Promise<T>): Promise<T> {
    return question(this);
  }
}
