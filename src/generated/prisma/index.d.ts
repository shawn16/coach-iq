
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Athlete
 * 
 */
export type Athlete = $Result.DefaultSelection<Prisma.$AthletePayload>
/**
 * Model TrainingPlan
 * 
 */
export type TrainingPlan = $Result.DefaultSelection<Prisma.$TrainingPlanPayload>
/**
 * Model TrainingPlanAthlete
 * 
 */
export type TrainingPlanAthlete = $Result.DefaultSelection<Prisma.$TrainingPlanAthletePayload>
/**
 * Model PlanWeek
 * 
 */
export type PlanWeek = $Result.DefaultSelection<Prisma.$PlanWeekPayload>
/**
 * Model WorkoutType
 * 
 */
export type WorkoutType = $Result.DefaultSelection<Prisma.$WorkoutTypePayload>
/**
 * Model PlanWorkout
 * 
 */
export type PlanWorkout = $Result.DefaultSelection<Prisma.$PlanWorkoutPayload>
/**
 * Model WorkoutResult
 * 
 */
export type WorkoutResult = $Result.DefaultSelection<Prisma.$WorkoutResultPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.athlete`: Exposes CRUD operations for the **Athlete** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Athletes
    * const athletes = await prisma.athlete.findMany()
    * ```
    */
  get athlete(): Prisma.AthleteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingPlan`: Exposes CRUD operations for the **TrainingPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingPlans
    * const trainingPlans = await prisma.trainingPlan.findMany()
    * ```
    */
  get trainingPlan(): Prisma.TrainingPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingPlanAthlete`: Exposes CRUD operations for the **TrainingPlanAthlete** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingPlanAthletes
    * const trainingPlanAthletes = await prisma.trainingPlanAthlete.findMany()
    * ```
    */
  get trainingPlanAthlete(): Prisma.TrainingPlanAthleteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.planWeek`: Exposes CRUD operations for the **PlanWeek** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanWeeks
    * const planWeeks = await prisma.planWeek.findMany()
    * ```
    */
  get planWeek(): Prisma.PlanWeekDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workoutType`: Exposes CRUD operations for the **WorkoutType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkoutTypes
    * const workoutTypes = await prisma.workoutType.findMany()
    * ```
    */
  get workoutType(): Prisma.WorkoutTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.planWorkout`: Exposes CRUD operations for the **PlanWorkout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanWorkouts
    * const planWorkouts = await prisma.planWorkout.findMany()
    * ```
    */
  get planWorkout(): Prisma.PlanWorkoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workoutResult`: Exposes CRUD operations for the **WorkoutResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkoutResults
    * const workoutResults = await prisma.workoutResult.findMany()
    * ```
    */
  get workoutResult(): Prisma.WorkoutResultDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Athlete: 'Athlete',
    TrainingPlan: 'TrainingPlan',
    TrainingPlanAthlete: 'TrainingPlanAthlete',
    PlanWeek: 'PlanWeek',
    WorkoutType: 'WorkoutType',
    PlanWorkout: 'PlanWorkout',
    WorkoutResult: 'WorkoutResult'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "athlete" | "trainingPlan" | "trainingPlanAthlete" | "planWeek" | "workoutType" | "planWorkout" | "workoutResult"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Athlete: {
        payload: Prisma.$AthletePayload<ExtArgs>
        fields: Prisma.AthleteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AthleteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AthleteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          findFirst: {
            args: Prisma.AthleteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AthleteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          findMany: {
            args: Prisma.AthleteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>[]
          }
          create: {
            args: Prisma.AthleteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          createMany: {
            args: Prisma.AthleteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AthleteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>[]
          }
          delete: {
            args: Prisma.AthleteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          update: {
            args: Prisma.AthleteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          deleteMany: {
            args: Prisma.AthleteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AthleteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AthleteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>[]
          }
          upsert: {
            args: Prisma.AthleteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          aggregate: {
            args: Prisma.AthleteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAthlete>
          }
          groupBy: {
            args: Prisma.AthleteGroupByArgs<ExtArgs>
            result: $Utils.Optional<AthleteGroupByOutputType>[]
          }
          count: {
            args: Prisma.AthleteCountArgs<ExtArgs>
            result: $Utils.Optional<AthleteCountAggregateOutputType> | number
          }
        }
      }
      TrainingPlan: {
        payload: Prisma.$TrainingPlanPayload<ExtArgs>
        fields: Prisma.TrainingPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          findFirst: {
            args: Prisma.TrainingPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          findMany: {
            args: Prisma.TrainingPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>[]
          }
          create: {
            args: Prisma.TrainingPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          createMany: {
            args: Prisma.TrainingPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>[]
          }
          delete: {
            args: Prisma.TrainingPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          update: {
            args: Prisma.TrainingPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          deleteMany: {
            args: Prisma.TrainingPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>[]
          }
          upsert: {
            args: Prisma.TrainingPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          aggregate: {
            args: Prisma.TrainingPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingPlan>
          }
          groupBy: {
            args: Prisma.TrainingPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingPlanCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanCountAggregateOutputType> | number
          }
        }
      }
      TrainingPlanAthlete: {
        payload: Prisma.$TrainingPlanAthletePayload<ExtArgs>
        fields: Prisma.TrainingPlanAthleteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingPlanAthleteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingPlanAthleteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload>
          }
          findFirst: {
            args: Prisma.TrainingPlanAthleteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingPlanAthleteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload>
          }
          findMany: {
            args: Prisma.TrainingPlanAthleteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload>[]
          }
          create: {
            args: Prisma.TrainingPlanAthleteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload>
          }
          createMany: {
            args: Prisma.TrainingPlanAthleteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingPlanAthleteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload>[]
          }
          delete: {
            args: Prisma.TrainingPlanAthleteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload>
          }
          update: {
            args: Prisma.TrainingPlanAthleteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload>
          }
          deleteMany: {
            args: Prisma.TrainingPlanAthleteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingPlanAthleteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingPlanAthleteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload>[]
          }
          upsert: {
            args: Prisma.TrainingPlanAthleteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanAthletePayload>
          }
          aggregate: {
            args: Prisma.TrainingPlanAthleteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingPlanAthlete>
          }
          groupBy: {
            args: Prisma.TrainingPlanAthleteGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanAthleteGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingPlanAthleteCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanAthleteCountAggregateOutputType> | number
          }
        }
      }
      PlanWeek: {
        payload: Prisma.$PlanWeekPayload<ExtArgs>
        fields: Prisma.PlanWeekFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanWeekFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanWeekFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload>
          }
          findFirst: {
            args: Prisma.PlanWeekFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanWeekFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload>
          }
          findMany: {
            args: Prisma.PlanWeekFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload>[]
          }
          create: {
            args: Prisma.PlanWeekCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload>
          }
          createMany: {
            args: Prisma.PlanWeekCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanWeekCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload>[]
          }
          delete: {
            args: Prisma.PlanWeekDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload>
          }
          update: {
            args: Prisma.PlanWeekUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload>
          }
          deleteMany: {
            args: Prisma.PlanWeekDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanWeekUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanWeekUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload>[]
          }
          upsert: {
            args: Prisma.PlanWeekUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWeekPayload>
          }
          aggregate: {
            args: Prisma.PlanWeekAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanWeek>
          }
          groupBy: {
            args: Prisma.PlanWeekGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanWeekGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanWeekCountArgs<ExtArgs>
            result: $Utils.Optional<PlanWeekCountAggregateOutputType> | number
          }
        }
      }
      WorkoutType: {
        payload: Prisma.$WorkoutTypePayload<ExtArgs>
        fields: Prisma.WorkoutTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkoutTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkoutTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload>
          }
          findFirst: {
            args: Prisma.WorkoutTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkoutTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload>
          }
          findMany: {
            args: Prisma.WorkoutTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload>[]
          }
          create: {
            args: Prisma.WorkoutTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload>
          }
          createMany: {
            args: Prisma.WorkoutTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkoutTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload>[]
          }
          delete: {
            args: Prisma.WorkoutTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload>
          }
          update: {
            args: Prisma.WorkoutTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload>
          }
          deleteMany: {
            args: Prisma.WorkoutTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkoutTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkoutTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload>[]
          }
          upsert: {
            args: Prisma.WorkoutTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutTypePayload>
          }
          aggregate: {
            args: Prisma.WorkoutTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkoutType>
          }
          groupBy: {
            args: Prisma.WorkoutTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkoutTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkoutTypeCountArgs<ExtArgs>
            result: $Utils.Optional<WorkoutTypeCountAggregateOutputType> | number
          }
        }
      }
      PlanWorkout: {
        payload: Prisma.$PlanWorkoutPayload<ExtArgs>
        fields: Prisma.PlanWorkoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanWorkoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanWorkoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload>
          }
          findFirst: {
            args: Prisma.PlanWorkoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanWorkoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload>
          }
          findMany: {
            args: Prisma.PlanWorkoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload>[]
          }
          create: {
            args: Prisma.PlanWorkoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload>
          }
          createMany: {
            args: Prisma.PlanWorkoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanWorkoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload>[]
          }
          delete: {
            args: Prisma.PlanWorkoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload>
          }
          update: {
            args: Prisma.PlanWorkoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload>
          }
          deleteMany: {
            args: Prisma.PlanWorkoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanWorkoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanWorkoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload>[]
          }
          upsert: {
            args: Prisma.PlanWorkoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanWorkoutPayload>
          }
          aggregate: {
            args: Prisma.PlanWorkoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanWorkout>
          }
          groupBy: {
            args: Prisma.PlanWorkoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanWorkoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanWorkoutCountArgs<ExtArgs>
            result: $Utils.Optional<PlanWorkoutCountAggregateOutputType> | number
          }
        }
      }
      WorkoutResult: {
        payload: Prisma.$WorkoutResultPayload<ExtArgs>
        fields: Prisma.WorkoutResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkoutResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkoutResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload>
          }
          findFirst: {
            args: Prisma.WorkoutResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkoutResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload>
          }
          findMany: {
            args: Prisma.WorkoutResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload>[]
          }
          create: {
            args: Prisma.WorkoutResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload>
          }
          createMany: {
            args: Prisma.WorkoutResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkoutResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload>[]
          }
          delete: {
            args: Prisma.WorkoutResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload>
          }
          update: {
            args: Prisma.WorkoutResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload>
          }
          deleteMany: {
            args: Prisma.WorkoutResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkoutResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkoutResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload>[]
          }
          upsert: {
            args: Prisma.WorkoutResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutResultPayload>
          }
          aggregate: {
            args: Prisma.WorkoutResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkoutResult>
          }
          groupBy: {
            args: Prisma.WorkoutResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkoutResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkoutResultCountArgs<ExtArgs>
            result: $Utils.Optional<WorkoutResultCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    athlete?: AthleteOmit
    trainingPlan?: TrainingPlanOmit
    trainingPlanAthlete?: TrainingPlanAthleteOmit
    planWeek?: PlanWeekOmit
    workoutType?: WorkoutTypeOmit
    planWorkout?: PlanWorkoutOmit
    workoutResult?: WorkoutResultOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    athletes: number
    trainingPlans: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    athletes?: boolean | UserCountOutputTypeCountAthletesArgs
    trainingPlans?: boolean | UserCountOutputTypeCountTrainingPlansArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAthletesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AthleteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTrainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanWhereInput
  }


  /**
   * Count Type AthleteCountOutputType
   */

  export type AthleteCountOutputType = {
    workoutResults: number
    trainingPlanAthletes: number
  }

  export type AthleteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutResults?: boolean | AthleteCountOutputTypeCountWorkoutResultsArgs
    trainingPlanAthletes?: boolean | AthleteCountOutputTypeCountTrainingPlanAthletesArgs
  }

  // Custom InputTypes
  /**
   * AthleteCountOutputType without action
   */
  export type AthleteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AthleteCountOutputType
     */
    select?: AthleteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AthleteCountOutputType without action
   */
  export type AthleteCountOutputTypeCountWorkoutResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutResultWhereInput
  }

  /**
   * AthleteCountOutputType without action
   */
  export type AthleteCountOutputTypeCountTrainingPlanAthletesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanAthleteWhereInput
  }


  /**
   * Count Type TrainingPlanCountOutputType
   */

  export type TrainingPlanCountOutputType = {
    weeks: number
    athletes: number
  }

  export type TrainingPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    weeks?: boolean | TrainingPlanCountOutputTypeCountWeeksArgs
    athletes?: boolean | TrainingPlanCountOutputTypeCountAthletesArgs
  }

  // Custom InputTypes
  /**
   * TrainingPlanCountOutputType without action
   */
  export type TrainingPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanCountOutputType
     */
    select?: TrainingPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainingPlanCountOutputType without action
   */
  export type TrainingPlanCountOutputTypeCountWeeksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWeekWhereInput
  }

  /**
   * TrainingPlanCountOutputType without action
   */
  export type TrainingPlanCountOutputTypeCountAthletesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanAthleteWhereInput
  }


  /**
   * Count Type PlanWeekCountOutputType
   */

  export type PlanWeekCountOutputType = {
    workouts: number
  }

  export type PlanWeekCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workouts?: boolean | PlanWeekCountOutputTypeCountWorkoutsArgs
  }

  // Custom InputTypes
  /**
   * PlanWeekCountOutputType without action
   */
  export type PlanWeekCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeekCountOutputType
     */
    select?: PlanWeekCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanWeekCountOutputType without action
   */
  export type PlanWeekCountOutputTypeCountWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWorkoutWhereInput
  }


  /**
   * Count Type WorkoutTypeCountOutputType
   */

  export type WorkoutTypeCountOutputType = {
    workouts: number
  }

  export type WorkoutTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workouts?: boolean | WorkoutTypeCountOutputTypeCountWorkoutsArgs
  }

  // Custom InputTypes
  /**
   * WorkoutTypeCountOutputType without action
   */
  export type WorkoutTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutTypeCountOutputType
     */
    select?: WorkoutTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkoutTypeCountOutputType without action
   */
  export type WorkoutTypeCountOutputTypeCountWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWorkoutWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    passwordHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    athletes?: boolean | User$athletesArgs<ExtArgs>
    trainingPlans?: boolean | User$trainingPlansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    athletes?: boolean | User$athletesArgs<ExtArgs>
    trainingPlans?: boolean | User$trainingPlansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      athletes: Prisma.$AthletePayload<ExtArgs>[]
      trainingPlans: Prisma.$TrainingPlanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      passwordHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    athletes<T extends User$athletesArgs<ExtArgs> = {}>(args?: Subset<T, User$athletesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trainingPlans<T extends User$trainingPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$trainingPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.athletes
   */
  export type User$athletesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    where?: AthleteWhereInput
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    cursor?: AthleteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * User.trainingPlans
   */
  export type User$trainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    where?: TrainingPlanWhereInput
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    cursor?: TrainingPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Athlete
   */

  export type AggregateAthlete = {
    _count: AthleteCountAggregateOutputType | null
    _avg: AthleteAvgAggregateOutputType | null
    _sum: AthleteSumAggregateOutputType | null
    _min: AthleteMinAggregateOutputType | null
    _max: AthleteMaxAggregateOutputType | null
  }

  export type AthleteAvgAggregateOutputType = {
    id: number | null
    grade: number | null
    time1600m: number | null
  }

  export type AthleteSumAggregateOutputType = {
    id: number | null
    grade: number | null
    time1600m: number | null
  }

  export type AthleteMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    birthday: Date | null
    grade: number | null
    time1600m: number | null
    createdAt: Date | null
    updatedAt: Date | null
    coachId: string | null
  }

  export type AthleteMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    birthday: Date | null
    grade: number | null
    time1600m: number | null
    createdAt: Date | null
    updatedAt: Date | null
    coachId: string | null
  }

  export type AthleteCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    birthday: number
    grade: number
    time1600m: number
    createdAt: number
    updatedAt: number
    coachId: number
    _all: number
  }


  export type AthleteAvgAggregateInputType = {
    id?: true
    grade?: true
    time1600m?: true
  }

  export type AthleteSumAggregateInputType = {
    id?: true
    grade?: true
    time1600m?: true
  }

  export type AthleteMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    birthday?: true
    grade?: true
    time1600m?: true
    createdAt?: true
    updatedAt?: true
    coachId?: true
  }

  export type AthleteMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    birthday?: true
    grade?: true
    time1600m?: true
    createdAt?: true
    updatedAt?: true
    coachId?: true
  }

  export type AthleteCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    birthday?: true
    grade?: true
    time1600m?: true
    createdAt?: true
    updatedAt?: true
    coachId?: true
    _all?: true
  }

  export type AthleteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Athlete to aggregate.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Athletes
    **/
    _count?: true | AthleteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AthleteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AthleteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AthleteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AthleteMaxAggregateInputType
  }

  export type GetAthleteAggregateType<T extends AthleteAggregateArgs> = {
        [P in keyof T & keyof AggregateAthlete]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAthlete[P]>
      : GetScalarType<T[P], AggregateAthlete[P]>
  }




  export type AthleteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AthleteWhereInput
    orderBy?: AthleteOrderByWithAggregationInput | AthleteOrderByWithAggregationInput[]
    by: AthleteScalarFieldEnum[] | AthleteScalarFieldEnum
    having?: AthleteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AthleteCountAggregateInputType | true
    _avg?: AthleteAvgAggregateInputType
    _sum?: AthleteSumAggregateInputType
    _min?: AthleteMinAggregateInputType
    _max?: AthleteMaxAggregateInputType
  }

  export type AthleteGroupByOutputType = {
    id: number
    firstName: string
    lastName: string
    birthday: Date
    grade: number
    time1600m: number
    createdAt: Date
    updatedAt: Date
    coachId: string
    _count: AthleteCountAggregateOutputType | null
    _avg: AthleteAvgAggregateOutputType | null
    _sum: AthleteSumAggregateOutputType | null
    _min: AthleteMinAggregateOutputType | null
    _max: AthleteMaxAggregateOutputType | null
  }

  type GetAthleteGroupByPayload<T extends AthleteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AthleteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AthleteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AthleteGroupByOutputType[P]>
            : GetScalarType<T[P], AthleteGroupByOutputType[P]>
        }
      >
    >


  export type AthleteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    birthday?: boolean
    grade?: boolean
    time1600m?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coachId?: boolean
    coach?: boolean | UserDefaultArgs<ExtArgs>
    workoutResults?: boolean | Athlete$workoutResultsArgs<ExtArgs>
    trainingPlanAthletes?: boolean | Athlete$trainingPlanAthletesArgs<ExtArgs>
    _count?: boolean | AthleteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["athlete"]>

  export type AthleteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    birthday?: boolean
    grade?: boolean
    time1600m?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coachId?: boolean
    coach?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["athlete"]>

  export type AthleteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    birthday?: boolean
    grade?: boolean
    time1600m?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coachId?: boolean
    coach?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["athlete"]>

  export type AthleteSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    birthday?: boolean
    grade?: boolean
    time1600m?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coachId?: boolean
  }

  export type AthleteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "birthday" | "grade" | "time1600m" | "createdAt" | "updatedAt" | "coachId", ExtArgs["result"]["athlete"]>
  export type AthleteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coach?: boolean | UserDefaultArgs<ExtArgs>
    workoutResults?: boolean | Athlete$workoutResultsArgs<ExtArgs>
    trainingPlanAthletes?: boolean | Athlete$trainingPlanAthletesArgs<ExtArgs>
    _count?: boolean | AthleteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AthleteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coach?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AthleteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coach?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AthletePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Athlete"
    objects: {
      coach: Prisma.$UserPayload<ExtArgs>
      workoutResults: Prisma.$WorkoutResultPayload<ExtArgs>[]
      trainingPlanAthletes: Prisma.$TrainingPlanAthletePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string
      birthday: Date
      grade: number
      time1600m: number
      createdAt: Date
      updatedAt: Date
      coachId: string
    }, ExtArgs["result"]["athlete"]>
    composites: {}
  }

  type AthleteGetPayload<S extends boolean | null | undefined | AthleteDefaultArgs> = $Result.GetResult<Prisma.$AthletePayload, S>

  type AthleteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AthleteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AthleteCountAggregateInputType | true
    }

  export interface AthleteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Athlete'], meta: { name: 'Athlete' } }
    /**
     * Find zero or one Athlete that matches the filter.
     * @param {AthleteFindUniqueArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AthleteFindUniqueArgs>(args: SelectSubset<T, AthleteFindUniqueArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Athlete that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AthleteFindUniqueOrThrowArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AthleteFindUniqueOrThrowArgs>(args: SelectSubset<T, AthleteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Athlete that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteFindFirstArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AthleteFindFirstArgs>(args?: SelectSubset<T, AthleteFindFirstArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Athlete that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteFindFirstOrThrowArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AthleteFindFirstOrThrowArgs>(args?: SelectSubset<T, AthleteFindFirstOrThrowArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Athletes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Athletes
     * const athletes = await prisma.athlete.findMany()
     * 
     * // Get first 10 Athletes
     * const athletes = await prisma.athlete.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const athleteWithIdOnly = await prisma.athlete.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AthleteFindManyArgs>(args?: SelectSubset<T, AthleteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Athlete.
     * @param {AthleteCreateArgs} args - Arguments to create a Athlete.
     * @example
     * // Create one Athlete
     * const Athlete = await prisma.athlete.create({
     *   data: {
     *     // ... data to create a Athlete
     *   }
     * })
     * 
     */
    create<T extends AthleteCreateArgs>(args: SelectSubset<T, AthleteCreateArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Athletes.
     * @param {AthleteCreateManyArgs} args - Arguments to create many Athletes.
     * @example
     * // Create many Athletes
     * const athlete = await prisma.athlete.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AthleteCreateManyArgs>(args?: SelectSubset<T, AthleteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Athletes and returns the data saved in the database.
     * @param {AthleteCreateManyAndReturnArgs} args - Arguments to create many Athletes.
     * @example
     * // Create many Athletes
     * const athlete = await prisma.athlete.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Athletes and only return the `id`
     * const athleteWithIdOnly = await prisma.athlete.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AthleteCreateManyAndReturnArgs>(args?: SelectSubset<T, AthleteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Athlete.
     * @param {AthleteDeleteArgs} args - Arguments to delete one Athlete.
     * @example
     * // Delete one Athlete
     * const Athlete = await prisma.athlete.delete({
     *   where: {
     *     // ... filter to delete one Athlete
     *   }
     * })
     * 
     */
    delete<T extends AthleteDeleteArgs>(args: SelectSubset<T, AthleteDeleteArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Athlete.
     * @param {AthleteUpdateArgs} args - Arguments to update one Athlete.
     * @example
     * // Update one Athlete
     * const athlete = await prisma.athlete.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AthleteUpdateArgs>(args: SelectSubset<T, AthleteUpdateArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Athletes.
     * @param {AthleteDeleteManyArgs} args - Arguments to filter Athletes to delete.
     * @example
     * // Delete a few Athletes
     * const { count } = await prisma.athlete.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AthleteDeleteManyArgs>(args?: SelectSubset<T, AthleteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Athletes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Athletes
     * const athlete = await prisma.athlete.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AthleteUpdateManyArgs>(args: SelectSubset<T, AthleteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Athletes and returns the data updated in the database.
     * @param {AthleteUpdateManyAndReturnArgs} args - Arguments to update many Athletes.
     * @example
     * // Update many Athletes
     * const athlete = await prisma.athlete.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Athletes and only return the `id`
     * const athleteWithIdOnly = await prisma.athlete.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AthleteUpdateManyAndReturnArgs>(args: SelectSubset<T, AthleteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Athlete.
     * @param {AthleteUpsertArgs} args - Arguments to update or create a Athlete.
     * @example
     * // Update or create a Athlete
     * const athlete = await prisma.athlete.upsert({
     *   create: {
     *     // ... data to create a Athlete
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Athlete we want to update
     *   }
     * })
     */
    upsert<T extends AthleteUpsertArgs>(args: SelectSubset<T, AthleteUpsertArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Athletes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteCountArgs} args - Arguments to filter Athletes to count.
     * @example
     * // Count the number of Athletes
     * const count = await prisma.athlete.count({
     *   where: {
     *     // ... the filter for the Athletes we want to count
     *   }
     * })
    **/
    count<T extends AthleteCountArgs>(
      args?: Subset<T, AthleteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AthleteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Athlete.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AthleteAggregateArgs>(args: Subset<T, AthleteAggregateArgs>): Prisma.PrismaPromise<GetAthleteAggregateType<T>>

    /**
     * Group by Athlete.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AthleteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AthleteGroupByArgs['orderBy'] }
        : { orderBy?: AthleteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AthleteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAthleteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Athlete model
   */
  readonly fields: AthleteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Athlete.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AthleteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coach<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workoutResults<T extends Athlete$workoutResultsArgs<ExtArgs> = {}>(args?: Subset<T, Athlete$workoutResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trainingPlanAthletes<T extends Athlete$trainingPlanAthletesArgs<ExtArgs> = {}>(args?: Subset<T, Athlete$trainingPlanAthletesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Athlete model
   */
  interface AthleteFieldRefs {
    readonly id: FieldRef<"Athlete", 'Int'>
    readonly firstName: FieldRef<"Athlete", 'String'>
    readonly lastName: FieldRef<"Athlete", 'String'>
    readonly birthday: FieldRef<"Athlete", 'DateTime'>
    readonly grade: FieldRef<"Athlete", 'Int'>
    readonly time1600m: FieldRef<"Athlete", 'Int'>
    readonly createdAt: FieldRef<"Athlete", 'DateTime'>
    readonly updatedAt: FieldRef<"Athlete", 'DateTime'>
    readonly coachId: FieldRef<"Athlete", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Athlete findUnique
   */
  export type AthleteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete findUniqueOrThrow
   */
  export type AthleteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete findFirst
   */
  export type AthleteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Athletes.
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Athletes.
     */
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Athlete findFirstOrThrow
   */
  export type AthleteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Athletes.
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Athletes.
     */
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Athlete findMany
   */
  export type AthleteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athletes to fetch.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Athletes.
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Athlete create
   */
  export type AthleteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * The data needed to create a Athlete.
     */
    data: XOR<AthleteCreateInput, AthleteUncheckedCreateInput>
  }

  /**
   * Athlete createMany
   */
  export type AthleteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Athletes.
     */
    data: AthleteCreateManyInput | AthleteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Athlete createManyAndReturn
   */
  export type AthleteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * The data used to create many Athletes.
     */
    data: AthleteCreateManyInput | AthleteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Athlete update
   */
  export type AthleteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * The data needed to update a Athlete.
     */
    data: XOR<AthleteUpdateInput, AthleteUncheckedUpdateInput>
    /**
     * Choose, which Athlete to update.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete updateMany
   */
  export type AthleteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Athletes.
     */
    data: XOR<AthleteUpdateManyMutationInput, AthleteUncheckedUpdateManyInput>
    /**
     * Filter which Athletes to update
     */
    where?: AthleteWhereInput
    /**
     * Limit how many Athletes to update.
     */
    limit?: number
  }

  /**
   * Athlete updateManyAndReturn
   */
  export type AthleteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * The data used to update Athletes.
     */
    data: XOR<AthleteUpdateManyMutationInput, AthleteUncheckedUpdateManyInput>
    /**
     * Filter which Athletes to update
     */
    where?: AthleteWhereInput
    /**
     * Limit how many Athletes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Athlete upsert
   */
  export type AthleteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * The filter to search for the Athlete to update in case it exists.
     */
    where: AthleteWhereUniqueInput
    /**
     * In case the Athlete found by the `where` argument doesn't exist, create a new Athlete with this data.
     */
    create: XOR<AthleteCreateInput, AthleteUncheckedCreateInput>
    /**
     * In case the Athlete was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AthleteUpdateInput, AthleteUncheckedUpdateInput>
  }

  /**
   * Athlete delete
   */
  export type AthleteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter which Athlete to delete.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete deleteMany
   */
  export type AthleteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Athletes to delete
     */
    where?: AthleteWhereInput
    /**
     * Limit how many Athletes to delete.
     */
    limit?: number
  }

  /**
   * Athlete.workoutResults
   */
  export type Athlete$workoutResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    where?: WorkoutResultWhereInput
    orderBy?: WorkoutResultOrderByWithRelationInput | WorkoutResultOrderByWithRelationInput[]
    cursor?: WorkoutResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutResultScalarFieldEnum | WorkoutResultScalarFieldEnum[]
  }

  /**
   * Athlete.trainingPlanAthletes
   */
  export type Athlete$trainingPlanAthletesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    where?: TrainingPlanAthleteWhereInput
    orderBy?: TrainingPlanAthleteOrderByWithRelationInput | TrainingPlanAthleteOrderByWithRelationInput[]
    cursor?: TrainingPlanAthleteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingPlanAthleteScalarFieldEnum | TrainingPlanAthleteScalarFieldEnum[]
  }

  /**
   * Athlete without action
   */
  export type AthleteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
  }


  /**
   * Model TrainingPlan
   */

  export type AggregateTrainingPlan = {
    _count: TrainingPlanCountAggregateOutputType | null
    _avg: TrainingPlanAvgAggregateOutputType | null
    _sum: TrainingPlanSumAggregateOutputType | null
    _min: TrainingPlanMinAggregateOutputType | null
    _max: TrainingPlanMaxAggregateOutputType | null
  }

  export type TrainingPlanAvgAggregateOutputType = {
    durationWeeks: number | null
    progress: number | null
    totalWorkouts: number | null
  }

  export type TrainingPlanSumAggregateOutputType = {
    durationWeeks: number | null
    progress: number | null
    totalWorkouts: number | null
  }

  export type TrainingPlanMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    duration: string | null
    durationWeeks: number | null
    startDate: Date | null
    endDate: Date | null
    progress: number | null
    type: string | null
    planType: string | null
    totalWorkouts: number | null
    isCompleted: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainingPlanMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    duration: string | null
    durationWeeks: number | null
    startDate: Date | null
    endDate: Date | null
    progress: number | null
    type: string | null
    planType: string | null
    totalWorkouts: number | null
    isCompleted: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainingPlanCountAggregateOutputType = {
    id: number
    title: number
    description: number
    duration: number
    durationWeeks: number
    startDate: number
    endDate: number
    progress: number
    type: number
    planType: number
    totalWorkouts: number
    isCompleted: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrainingPlanAvgAggregateInputType = {
    durationWeeks?: true
    progress?: true
    totalWorkouts?: true
  }

  export type TrainingPlanSumAggregateInputType = {
    durationWeeks?: true
    progress?: true
    totalWorkouts?: true
  }

  export type TrainingPlanMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    duration?: true
    durationWeeks?: true
    startDate?: true
    endDate?: true
    progress?: true
    type?: true
    planType?: true
    totalWorkouts?: true
    isCompleted?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainingPlanMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    duration?: true
    durationWeeks?: true
    startDate?: true
    endDate?: true
    progress?: true
    type?: true
    planType?: true
    totalWorkouts?: true
    isCompleted?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainingPlanCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    duration?: true
    durationWeeks?: true
    startDate?: true
    endDate?: true
    progress?: true
    type?: true
    planType?: true
    totalWorkouts?: true
    isCompleted?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrainingPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlan to aggregate.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingPlans
    **/
    _count?: true | TrainingPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingPlanMaxAggregateInputType
  }

  export type GetTrainingPlanAggregateType<T extends TrainingPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingPlan[P]>
      : GetScalarType<T[P], AggregateTrainingPlan[P]>
  }




  export type TrainingPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanWhereInput
    orderBy?: TrainingPlanOrderByWithAggregationInput | TrainingPlanOrderByWithAggregationInput[]
    by: TrainingPlanScalarFieldEnum[] | TrainingPlanScalarFieldEnum
    having?: TrainingPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingPlanCountAggregateInputType | true
    _avg?: TrainingPlanAvgAggregateInputType
    _sum?: TrainingPlanSumAggregateInputType
    _min?: TrainingPlanMinAggregateInputType
    _max?: TrainingPlanMaxAggregateInputType
  }

  export type TrainingPlanGroupByOutputType = {
    id: string
    title: string
    description: string | null
    duration: string
    durationWeeks: number
    startDate: Date
    endDate: Date
    progress: number | null
    type: string | null
    planType: string | null
    totalWorkouts: number | null
    isCompleted: boolean
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: TrainingPlanCountAggregateOutputType | null
    _avg: TrainingPlanAvgAggregateOutputType | null
    _sum: TrainingPlanSumAggregateOutputType | null
    _min: TrainingPlanMinAggregateOutputType | null
    _max: TrainingPlanMaxAggregateOutputType | null
  }

  type GetTrainingPlanGroupByPayload<T extends TrainingPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingPlanGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingPlanGroupByOutputType[P]>
        }
      >
    >


  export type TrainingPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    duration?: boolean
    durationWeeks?: boolean
    startDate?: boolean
    endDate?: boolean
    progress?: boolean
    type?: boolean
    planType?: boolean
    totalWorkouts?: boolean
    isCompleted?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    weeks?: boolean | TrainingPlan$weeksArgs<ExtArgs>
    athletes?: boolean | TrainingPlan$athletesArgs<ExtArgs>
    _count?: boolean | TrainingPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlan"]>

  export type TrainingPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    duration?: boolean
    durationWeeks?: boolean
    startDate?: boolean
    endDate?: boolean
    progress?: boolean
    type?: boolean
    planType?: boolean
    totalWorkouts?: boolean
    isCompleted?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlan"]>

  export type TrainingPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    duration?: boolean
    durationWeeks?: boolean
    startDate?: boolean
    endDate?: boolean
    progress?: boolean
    type?: boolean
    planType?: boolean
    totalWorkouts?: boolean
    isCompleted?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlan"]>

  export type TrainingPlanSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    duration?: boolean
    durationWeeks?: boolean
    startDate?: boolean
    endDate?: boolean
    progress?: boolean
    type?: boolean
    planType?: boolean
    totalWorkouts?: boolean
    isCompleted?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrainingPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "duration" | "durationWeeks" | "startDate" | "endDate" | "progress" | "type" | "planType" | "totalWorkouts" | "isCompleted" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["trainingPlan"]>
  export type TrainingPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    weeks?: boolean | TrainingPlan$weeksArgs<ExtArgs>
    athletes?: boolean | TrainingPlan$athletesArgs<ExtArgs>
    _count?: boolean | TrainingPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainingPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TrainingPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TrainingPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingPlan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      weeks: Prisma.$PlanWeekPayload<ExtArgs>[]
      athletes: Prisma.$TrainingPlanAthletePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      duration: string
      durationWeeks: number
      startDate: Date
      endDate: Date
      progress: number | null
      type: string | null
      planType: string | null
      totalWorkouts: number | null
      isCompleted: boolean
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trainingPlan"]>
    composites: {}
  }

  type TrainingPlanGetPayload<S extends boolean | null | undefined | TrainingPlanDefaultArgs> = $Result.GetResult<Prisma.$TrainingPlanPayload, S>

  type TrainingPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingPlanCountAggregateInputType | true
    }

  export interface TrainingPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingPlan'], meta: { name: 'TrainingPlan' } }
    /**
     * Find zero or one TrainingPlan that matches the filter.
     * @param {TrainingPlanFindUniqueArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingPlanFindUniqueArgs>(args: SelectSubset<T, TrainingPlanFindUniqueArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingPlanFindUniqueOrThrowArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanFindFirstArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingPlanFindFirstArgs>(args?: SelectSubset<T, TrainingPlanFindFirstArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanFindFirstOrThrowArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingPlans
     * const trainingPlans = await prisma.trainingPlan.findMany()
     * 
     * // Get first 10 TrainingPlans
     * const trainingPlans = await prisma.trainingPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingPlanWithIdOnly = await prisma.trainingPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingPlanFindManyArgs>(args?: SelectSubset<T, TrainingPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingPlan.
     * @param {TrainingPlanCreateArgs} args - Arguments to create a TrainingPlan.
     * @example
     * // Create one TrainingPlan
     * const TrainingPlan = await prisma.trainingPlan.create({
     *   data: {
     *     // ... data to create a TrainingPlan
     *   }
     * })
     * 
     */
    create<T extends TrainingPlanCreateArgs>(args: SelectSubset<T, TrainingPlanCreateArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingPlans.
     * @param {TrainingPlanCreateManyArgs} args - Arguments to create many TrainingPlans.
     * @example
     * // Create many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingPlanCreateManyArgs>(args?: SelectSubset<T, TrainingPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingPlans and returns the data saved in the database.
     * @param {TrainingPlanCreateManyAndReturnArgs} args - Arguments to create many TrainingPlans.
     * @example
     * // Create many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingPlans and only return the `id`
     * const trainingPlanWithIdOnly = await prisma.trainingPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingPlan.
     * @param {TrainingPlanDeleteArgs} args - Arguments to delete one TrainingPlan.
     * @example
     * // Delete one TrainingPlan
     * const TrainingPlan = await prisma.trainingPlan.delete({
     *   where: {
     *     // ... filter to delete one TrainingPlan
     *   }
     * })
     * 
     */
    delete<T extends TrainingPlanDeleteArgs>(args: SelectSubset<T, TrainingPlanDeleteArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingPlan.
     * @param {TrainingPlanUpdateArgs} args - Arguments to update one TrainingPlan.
     * @example
     * // Update one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingPlanUpdateArgs>(args: SelectSubset<T, TrainingPlanUpdateArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingPlans.
     * @param {TrainingPlanDeleteManyArgs} args - Arguments to filter TrainingPlans to delete.
     * @example
     * // Delete a few TrainingPlans
     * const { count } = await prisma.trainingPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingPlanDeleteManyArgs>(args?: SelectSubset<T, TrainingPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingPlanUpdateManyArgs>(args: SelectSubset<T, TrainingPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlans and returns the data updated in the database.
     * @param {TrainingPlanUpdateManyAndReturnArgs} args - Arguments to update many TrainingPlans.
     * @example
     * // Update many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingPlans and only return the `id`
     * const trainingPlanWithIdOnly = await prisma.trainingPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingPlan.
     * @param {TrainingPlanUpsertArgs} args - Arguments to update or create a TrainingPlan.
     * @example
     * // Update or create a TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.upsert({
     *   create: {
     *     // ... data to create a TrainingPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingPlan we want to update
     *   }
     * })
     */
    upsert<T extends TrainingPlanUpsertArgs>(args: SelectSubset<T, TrainingPlanUpsertArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanCountArgs} args - Arguments to filter TrainingPlans to count.
     * @example
     * // Count the number of TrainingPlans
     * const count = await prisma.trainingPlan.count({
     *   where: {
     *     // ... the filter for the TrainingPlans we want to count
     *   }
     * })
    **/
    count<T extends TrainingPlanCountArgs>(
      args?: Subset<T, TrainingPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingPlanAggregateArgs>(args: Subset<T, TrainingPlanAggregateArgs>): Prisma.PrismaPromise<GetTrainingPlanAggregateType<T>>

    /**
     * Group by TrainingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingPlanGroupByArgs['orderBy'] }
        : { orderBy?: TrainingPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingPlan model
   */
  readonly fields: TrainingPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    weeks<T extends TrainingPlan$weeksArgs<ExtArgs> = {}>(args?: Subset<T, TrainingPlan$weeksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    athletes<T extends TrainingPlan$athletesArgs<ExtArgs> = {}>(args?: Subset<T, TrainingPlan$athletesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingPlan model
   */
  interface TrainingPlanFieldRefs {
    readonly id: FieldRef<"TrainingPlan", 'String'>
    readonly title: FieldRef<"TrainingPlan", 'String'>
    readonly description: FieldRef<"TrainingPlan", 'String'>
    readonly duration: FieldRef<"TrainingPlan", 'String'>
    readonly durationWeeks: FieldRef<"TrainingPlan", 'Int'>
    readonly startDate: FieldRef<"TrainingPlan", 'DateTime'>
    readonly endDate: FieldRef<"TrainingPlan", 'DateTime'>
    readonly progress: FieldRef<"TrainingPlan", 'Int'>
    readonly type: FieldRef<"TrainingPlan", 'String'>
    readonly planType: FieldRef<"TrainingPlan", 'String'>
    readonly totalWorkouts: FieldRef<"TrainingPlan", 'Int'>
    readonly isCompleted: FieldRef<"TrainingPlan", 'Boolean'>
    readonly userId: FieldRef<"TrainingPlan", 'String'>
    readonly createdAt: FieldRef<"TrainingPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"TrainingPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainingPlan findUnique
   */
  export type TrainingPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan findUniqueOrThrow
   */
  export type TrainingPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan findFirst
   */
  export type TrainingPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlans.
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlans.
     */
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * TrainingPlan findFirstOrThrow
   */
  export type TrainingPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlans.
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlans.
     */
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * TrainingPlan findMany
   */
  export type TrainingPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlans to fetch.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingPlans.
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * TrainingPlan create
   */
  export type TrainingPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingPlan.
     */
    data: XOR<TrainingPlanCreateInput, TrainingPlanUncheckedCreateInput>
  }

  /**
   * TrainingPlan createMany
   */
  export type TrainingPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingPlans.
     */
    data: TrainingPlanCreateManyInput | TrainingPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingPlan createManyAndReturn
   */
  export type TrainingPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingPlans.
     */
    data: TrainingPlanCreateManyInput | TrainingPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlan update
   */
  export type TrainingPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingPlan.
     */
    data: XOR<TrainingPlanUpdateInput, TrainingPlanUncheckedUpdateInput>
    /**
     * Choose, which TrainingPlan to update.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan updateMany
   */
  export type TrainingPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingPlans.
     */
    data: XOR<TrainingPlanUpdateManyMutationInput, TrainingPlanUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlans to update
     */
    where?: TrainingPlanWhereInput
    /**
     * Limit how many TrainingPlans to update.
     */
    limit?: number
  }

  /**
   * TrainingPlan updateManyAndReturn
   */
  export type TrainingPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * The data used to update TrainingPlans.
     */
    data: XOR<TrainingPlanUpdateManyMutationInput, TrainingPlanUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlans to update
     */
    where?: TrainingPlanWhereInput
    /**
     * Limit how many TrainingPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlan upsert
   */
  export type TrainingPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingPlan to update in case it exists.
     */
    where: TrainingPlanWhereUniqueInput
    /**
     * In case the TrainingPlan found by the `where` argument doesn't exist, create a new TrainingPlan with this data.
     */
    create: XOR<TrainingPlanCreateInput, TrainingPlanUncheckedCreateInput>
    /**
     * In case the TrainingPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingPlanUpdateInput, TrainingPlanUncheckedUpdateInput>
  }

  /**
   * TrainingPlan delete
   */
  export type TrainingPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter which TrainingPlan to delete.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan deleteMany
   */
  export type TrainingPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlans to delete
     */
    where?: TrainingPlanWhereInput
    /**
     * Limit how many TrainingPlans to delete.
     */
    limit?: number
  }

  /**
   * TrainingPlan.weeks
   */
  export type TrainingPlan$weeksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    where?: PlanWeekWhereInput
    orderBy?: PlanWeekOrderByWithRelationInput | PlanWeekOrderByWithRelationInput[]
    cursor?: PlanWeekWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanWeekScalarFieldEnum | PlanWeekScalarFieldEnum[]
  }

  /**
   * TrainingPlan.athletes
   */
  export type TrainingPlan$athletesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    where?: TrainingPlanAthleteWhereInput
    orderBy?: TrainingPlanAthleteOrderByWithRelationInput | TrainingPlanAthleteOrderByWithRelationInput[]
    cursor?: TrainingPlanAthleteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingPlanAthleteScalarFieldEnum | TrainingPlanAthleteScalarFieldEnum[]
  }

  /**
   * TrainingPlan without action
   */
  export type TrainingPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
  }


  /**
   * Model TrainingPlanAthlete
   */

  export type AggregateTrainingPlanAthlete = {
    _count: TrainingPlanAthleteCountAggregateOutputType | null
    _avg: TrainingPlanAthleteAvgAggregateOutputType | null
    _sum: TrainingPlanAthleteSumAggregateOutputType | null
    _min: TrainingPlanAthleteMinAggregateOutputType | null
    _max: TrainingPlanAthleteMaxAggregateOutputType | null
  }

  export type TrainingPlanAthleteAvgAggregateOutputType = {
    athleteId: number | null
  }

  export type TrainingPlanAthleteSumAggregateOutputType = {
    athleteId: number | null
  }

  export type TrainingPlanAthleteMinAggregateOutputType = {
    trainingPlanId: string | null
    athleteId: number | null
    assignedAt: Date | null
  }

  export type TrainingPlanAthleteMaxAggregateOutputType = {
    trainingPlanId: string | null
    athleteId: number | null
    assignedAt: Date | null
  }

  export type TrainingPlanAthleteCountAggregateOutputType = {
    trainingPlanId: number
    athleteId: number
    assignedAt: number
    _all: number
  }


  export type TrainingPlanAthleteAvgAggregateInputType = {
    athleteId?: true
  }

  export type TrainingPlanAthleteSumAggregateInputType = {
    athleteId?: true
  }

  export type TrainingPlanAthleteMinAggregateInputType = {
    trainingPlanId?: true
    athleteId?: true
    assignedAt?: true
  }

  export type TrainingPlanAthleteMaxAggregateInputType = {
    trainingPlanId?: true
    athleteId?: true
    assignedAt?: true
  }

  export type TrainingPlanAthleteCountAggregateInputType = {
    trainingPlanId?: true
    athleteId?: true
    assignedAt?: true
    _all?: true
  }

  export type TrainingPlanAthleteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlanAthlete to aggregate.
     */
    where?: TrainingPlanAthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlanAthletes to fetch.
     */
    orderBy?: TrainingPlanAthleteOrderByWithRelationInput | TrainingPlanAthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingPlanAthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlanAthletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlanAthletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingPlanAthletes
    **/
    _count?: true | TrainingPlanAthleteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingPlanAthleteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingPlanAthleteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingPlanAthleteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingPlanAthleteMaxAggregateInputType
  }

  export type GetTrainingPlanAthleteAggregateType<T extends TrainingPlanAthleteAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingPlanAthlete]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingPlanAthlete[P]>
      : GetScalarType<T[P], AggregateTrainingPlanAthlete[P]>
  }




  export type TrainingPlanAthleteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanAthleteWhereInput
    orderBy?: TrainingPlanAthleteOrderByWithAggregationInput | TrainingPlanAthleteOrderByWithAggregationInput[]
    by: TrainingPlanAthleteScalarFieldEnum[] | TrainingPlanAthleteScalarFieldEnum
    having?: TrainingPlanAthleteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingPlanAthleteCountAggregateInputType | true
    _avg?: TrainingPlanAthleteAvgAggregateInputType
    _sum?: TrainingPlanAthleteSumAggregateInputType
    _min?: TrainingPlanAthleteMinAggregateInputType
    _max?: TrainingPlanAthleteMaxAggregateInputType
  }

  export type TrainingPlanAthleteGroupByOutputType = {
    trainingPlanId: string
    athleteId: number
    assignedAt: Date
    _count: TrainingPlanAthleteCountAggregateOutputType | null
    _avg: TrainingPlanAthleteAvgAggregateOutputType | null
    _sum: TrainingPlanAthleteSumAggregateOutputType | null
    _min: TrainingPlanAthleteMinAggregateOutputType | null
    _max: TrainingPlanAthleteMaxAggregateOutputType | null
  }

  type GetTrainingPlanAthleteGroupByPayload<T extends TrainingPlanAthleteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingPlanAthleteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingPlanAthleteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingPlanAthleteGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingPlanAthleteGroupByOutputType[P]>
        }
      >
    >


  export type TrainingPlanAthleteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    trainingPlanId?: boolean
    athleteId?: boolean
    assignedAt?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlanAthlete"]>

  export type TrainingPlanAthleteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    trainingPlanId?: boolean
    athleteId?: boolean
    assignedAt?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlanAthlete"]>

  export type TrainingPlanAthleteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    trainingPlanId?: boolean
    athleteId?: boolean
    assignedAt?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlanAthlete"]>

  export type TrainingPlanAthleteSelectScalar = {
    trainingPlanId?: boolean
    athleteId?: boolean
    assignedAt?: boolean
  }

  export type TrainingPlanAthleteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"trainingPlanId" | "athleteId" | "assignedAt", ExtArgs["result"]["trainingPlanAthlete"]>
  export type TrainingPlanAthleteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }
  export type TrainingPlanAthleteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }
  export type TrainingPlanAthleteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }

  export type $TrainingPlanAthletePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingPlanAthlete"
    objects: {
      trainingPlan: Prisma.$TrainingPlanPayload<ExtArgs>
      athlete: Prisma.$AthletePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      trainingPlanId: string
      athleteId: number
      assignedAt: Date
    }, ExtArgs["result"]["trainingPlanAthlete"]>
    composites: {}
  }

  type TrainingPlanAthleteGetPayload<S extends boolean | null | undefined | TrainingPlanAthleteDefaultArgs> = $Result.GetResult<Prisma.$TrainingPlanAthletePayload, S>

  type TrainingPlanAthleteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingPlanAthleteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingPlanAthleteCountAggregateInputType | true
    }

  export interface TrainingPlanAthleteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingPlanAthlete'], meta: { name: 'TrainingPlanAthlete' } }
    /**
     * Find zero or one TrainingPlanAthlete that matches the filter.
     * @param {TrainingPlanAthleteFindUniqueArgs} args - Arguments to find a TrainingPlanAthlete
     * @example
     * // Get one TrainingPlanAthlete
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingPlanAthleteFindUniqueArgs>(args: SelectSubset<T, TrainingPlanAthleteFindUniqueArgs<ExtArgs>>): Prisma__TrainingPlanAthleteClient<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingPlanAthlete that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingPlanAthleteFindUniqueOrThrowArgs} args - Arguments to find a TrainingPlanAthlete
     * @example
     * // Get one TrainingPlanAthlete
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingPlanAthleteFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingPlanAthleteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanAthleteClient<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlanAthlete that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAthleteFindFirstArgs} args - Arguments to find a TrainingPlanAthlete
     * @example
     * // Get one TrainingPlanAthlete
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingPlanAthleteFindFirstArgs>(args?: SelectSubset<T, TrainingPlanAthleteFindFirstArgs<ExtArgs>>): Prisma__TrainingPlanAthleteClient<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlanAthlete that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAthleteFindFirstOrThrowArgs} args - Arguments to find a TrainingPlanAthlete
     * @example
     * // Get one TrainingPlanAthlete
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingPlanAthleteFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingPlanAthleteFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanAthleteClient<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingPlanAthletes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAthleteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingPlanAthletes
     * const trainingPlanAthletes = await prisma.trainingPlanAthlete.findMany()
     * 
     * // Get first 10 TrainingPlanAthletes
     * const trainingPlanAthletes = await prisma.trainingPlanAthlete.findMany({ take: 10 })
     * 
     * // Only select the `trainingPlanId`
     * const trainingPlanAthleteWithTrainingPlanIdOnly = await prisma.trainingPlanAthlete.findMany({ select: { trainingPlanId: true } })
     * 
     */
    findMany<T extends TrainingPlanAthleteFindManyArgs>(args?: SelectSubset<T, TrainingPlanAthleteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingPlanAthlete.
     * @param {TrainingPlanAthleteCreateArgs} args - Arguments to create a TrainingPlanAthlete.
     * @example
     * // Create one TrainingPlanAthlete
     * const TrainingPlanAthlete = await prisma.trainingPlanAthlete.create({
     *   data: {
     *     // ... data to create a TrainingPlanAthlete
     *   }
     * })
     * 
     */
    create<T extends TrainingPlanAthleteCreateArgs>(args: SelectSubset<T, TrainingPlanAthleteCreateArgs<ExtArgs>>): Prisma__TrainingPlanAthleteClient<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingPlanAthletes.
     * @param {TrainingPlanAthleteCreateManyArgs} args - Arguments to create many TrainingPlanAthletes.
     * @example
     * // Create many TrainingPlanAthletes
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingPlanAthleteCreateManyArgs>(args?: SelectSubset<T, TrainingPlanAthleteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingPlanAthletes and returns the data saved in the database.
     * @param {TrainingPlanAthleteCreateManyAndReturnArgs} args - Arguments to create many TrainingPlanAthletes.
     * @example
     * // Create many TrainingPlanAthletes
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingPlanAthletes and only return the `trainingPlanId`
     * const trainingPlanAthleteWithTrainingPlanIdOnly = await prisma.trainingPlanAthlete.createManyAndReturn({
     *   select: { trainingPlanId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingPlanAthleteCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingPlanAthleteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingPlanAthlete.
     * @param {TrainingPlanAthleteDeleteArgs} args - Arguments to delete one TrainingPlanAthlete.
     * @example
     * // Delete one TrainingPlanAthlete
     * const TrainingPlanAthlete = await prisma.trainingPlanAthlete.delete({
     *   where: {
     *     // ... filter to delete one TrainingPlanAthlete
     *   }
     * })
     * 
     */
    delete<T extends TrainingPlanAthleteDeleteArgs>(args: SelectSubset<T, TrainingPlanAthleteDeleteArgs<ExtArgs>>): Prisma__TrainingPlanAthleteClient<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingPlanAthlete.
     * @param {TrainingPlanAthleteUpdateArgs} args - Arguments to update one TrainingPlanAthlete.
     * @example
     * // Update one TrainingPlanAthlete
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingPlanAthleteUpdateArgs>(args: SelectSubset<T, TrainingPlanAthleteUpdateArgs<ExtArgs>>): Prisma__TrainingPlanAthleteClient<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingPlanAthletes.
     * @param {TrainingPlanAthleteDeleteManyArgs} args - Arguments to filter TrainingPlanAthletes to delete.
     * @example
     * // Delete a few TrainingPlanAthletes
     * const { count } = await prisma.trainingPlanAthlete.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingPlanAthleteDeleteManyArgs>(args?: SelectSubset<T, TrainingPlanAthleteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlanAthletes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAthleteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingPlanAthletes
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingPlanAthleteUpdateManyArgs>(args: SelectSubset<T, TrainingPlanAthleteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlanAthletes and returns the data updated in the database.
     * @param {TrainingPlanAthleteUpdateManyAndReturnArgs} args - Arguments to update many TrainingPlanAthletes.
     * @example
     * // Update many TrainingPlanAthletes
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingPlanAthletes and only return the `trainingPlanId`
     * const trainingPlanAthleteWithTrainingPlanIdOnly = await prisma.trainingPlanAthlete.updateManyAndReturn({
     *   select: { trainingPlanId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingPlanAthleteUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingPlanAthleteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingPlanAthlete.
     * @param {TrainingPlanAthleteUpsertArgs} args - Arguments to update or create a TrainingPlanAthlete.
     * @example
     * // Update or create a TrainingPlanAthlete
     * const trainingPlanAthlete = await prisma.trainingPlanAthlete.upsert({
     *   create: {
     *     // ... data to create a TrainingPlanAthlete
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingPlanAthlete we want to update
     *   }
     * })
     */
    upsert<T extends TrainingPlanAthleteUpsertArgs>(args: SelectSubset<T, TrainingPlanAthleteUpsertArgs<ExtArgs>>): Prisma__TrainingPlanAthleteClient<$Result.GetResult<Prisma.$TrainingPlanAthletePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingPlanAthletes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAthleteCountArgs} args - Arguments to filter TrainingPlanAthletes to count.
     * @example
     * // Count the number of TrainingPlanAthletes
     * const count = await prisma.trainingPlanAthlete.count({
     *   where: {
     *     // ... the filter for the TrainingPlanAthletes we want to count
     *   }
     * })
    **/
    count<T extends TrainingPlanAthleteCountArgs>(
      args?: Subset<T, TrainingPlanAthleteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingPlanAthleteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingPlanAthlete.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAthleteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingPlanAthleteAggregateArgs>(args: Subset<T, TrainingPlanAthleteAggregateArgs>): Prisma.PrismaPromise<GetTrainingPlanAthleteAggregateType<T>>

    /**
     * Group by TrainingPlanAthlete.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAthleteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingPlanAthleteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingPlanAthleteGroupByArgs['orderBy'] }
        : { orderBy?: TrainingPlanAthleteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingPlanAthleteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingPlanAthleteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingPlanAthlete model
   */
  readonly fields: TrainingPlanAthleteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingPlanAthlete.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingPlanAthleteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainingPlan<T extends TrainingPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingPlanDefaultArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    athlete<T extends AthleteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AthleteDefaultArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingPlanAthlete model
   */
  interface TrainingPlanAthleteFieldRefs {
    readonly trainingPlanId: FieldRef<"TrainingPlanAthlete", 'String'>
    readonly athleteId: FieldRef<"TrainingPlanAthlete", 'Int'>
    readonly assignedAt: FieldRef<"TrainingPlanAthlete", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainingPlanAthlete findUnique
   */
  export type TrainingPlanAthleteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanAthlete to fetch.
     */
    where: TrainingPlanAthleteWhereUniqueInput
  }

  /**
   * TrainingPlanAthlete findUniqueOrThrow
   */
  export type TrainingPlanAthleteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanAthlete to fetch.
     */
    where: TrainingPlanAthleteWhereUniqueInput
  }

  /**
   * TrainingPlanAthlete findFirst
   */
  export type TrainingPlanAthleteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanAthlete to fetch.
     */
    where?: TrainingPlanAthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlanAthletes to fetch.
     */
    orderBy?: TrainingPlanAthleteOrderByWithRelationInput | TrainingPlanAthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlanAthletes.
     */
    cursor?: TrainingPlanAthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlanAthletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlanAthletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlanAthletes.
     */
    distinct?: TrainingPlanAthleteScalarFieldEnum | TrainingPlanAthleteScalarFieldEnum[]
  }

  /**
   * TrainingPlanAthlete findFirstOrThrow
   */
  export type TrainingPlanAthleteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanAthlete to fetch.
     */
    where?: TrainingPlanAthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlanAthletes to fetch.
     */
    orderBy?: TrainingPlanAthleteOrderByWithRelationInput | TrainingPlanAthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlanAthletes.
     */
    cursor?: TrainingPlanAthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlanAthletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlanAthletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlanAthletes.
     */
    distinct?: TrainingPlanAthleteScalarFieldEnum | TrainingPlanAthleteScalarFieldEnum[]
  }

  /**
   * TrainingPlanAthlete findMany
   */
  export type TrainingPlanAthleteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanAthletes to fetch.
     */
    where?: TrainingPlanAthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlanAthletes to fetch.
     */
    orderBy?: TrainingPlanAthleteOrderByWithRelationInput | TrainingPlanAthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingPlanAthletes.
     */
    cursor?: TrainingPlanAthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlanAthletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlanAthletes.
     */
    skip?: number
    distinct?: TrainingPlanAthleteScalarFieldEnum | TrainingPlanAthleteScalarFieldEnum[]
  }

  /**
   * TrainingPlanAthlete create
   */
  export type TrainingPlanAthleteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingPlanAthlete.
     */
    data: XOR<TrainingPlanAthleteCreateInput, TrainingPlanAthleteUncheckedCreateInput>
  }

  /**
   * TrainingPlanAthlete createMany
   */
  export type TrainingPlanAthleteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingPlanAthletes.
     */
    data: TrainingPlanAthleteCreateManyInput | TrainingPlanAthleteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingPlanAthlete createManyAndReturn
   */
  export type TrainingPlanAthleteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingPlanAthletes.
     */
    data: TrainingPlanAthleteCreateManyInput | TrainingPlanAthleteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlanAthlete update
   */
  export type TrainingPlanAthleteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingPlanAthlete.
     */
    data: XOR<TrainingPlanAthleteUpdateInput, TrainingPlanAthleteUncheckedUpdateInput>
    /**
     * Choose, which TrainingPlanAthlete to update.
     */
    where: TrainingPlanAthleteWhereUniqueInput
  }

  /**
   * TrainingPlanAthlete updateMany
   */
  export type TrainingPlanAthleteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingPlanAthletes.
     */
    data: XOR<TrainingPlanAthleteUpdateManyMutationInput, TrainingPlanAthleteUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlanAthletes to update
     */
    where?: TrainingPlanAthleteWhereInput
    /**
     * Limit how many TrainingPlanAthletes to update.
     */
    limit?: number
  }

  /**
   * TrainingPlanAthlete updateManyAndReturn
   */
  export type TrainingPlanAthleteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * The data used to update TrainingPlanAthletes.
     */
    data: XOR<TrainingPlanAthleteUpdateManyMutationInput, TrainingPlanAthleteUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlanAthletes to update
     */
    where?: TrainingPlanAthleteWhereInput
    /**
     * Limit how many TrainingPlanAthletes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlanAthlete upsert
   */
  export type TrainingPlanAthleteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingPlanAthlete to update in case it exists.
     */
    where: TrainingPlanAthleteWhereUniqueInput
    /**
     * In case the TrainingPlanAthlete found by the `where` argument doesn't exist, create a new TrainingPlanAthlete with this data.
     */
    create: XOR<TrainingPlanAthleteCreateInput, TrainingPlanAthleteUncheckedCreateInput>
    /**
     * In case the TrainingPlanAthlete was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingPlanAthleteUpdateInput, TrainingPlanAthleteUncheckedUpdateInput>
  }

  /**
   * TrainingPlanAthlete delete
   */
  export type TrainingPlanAthleteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
    /**
     * Filter which TrainingPlanAthlete to delete.
     */
    where: TrainingPlanAthleteWhereUniqueInput
  }

  /**
   * TrainingPlanAthlete deleteMany
   */
  export type TrainingPlanAthleteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlanAthletes to delete
     */
    where?: TrainingPlanAthleteWhereInput
    /**
     * Limit how many TrainingPlanAthletes to delete.
     */
    limit?: number
  }

  /**
   * TrainingPlanAthlete without action
   */
  export type TrainingPlanAthleteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanAthlete
     */
    select?: TrainingPlanAthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanAthlete
     */
    omit?: TrainingPlanAthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanAthleteInclude<ExtArgs> | null
  }


  /**
   * Model PlanWeek
   */

  export type AggregatePlanWeek = {
    _count: PlanWeekCountAggregateOutputType | null
    _avg: PlanWeekAvgAggregateOutputType | null
    _sum: PlanWeekSumAggregateOutputType | null
    _min: PlanWeekMinAggregateOutputType | null
    _max: PlanWeekMaxAggregateOutputType | null
  }

  export type PlanWeekAvgAggregateOutputType = {
    weekNumber: number | null
  }

  export type PlanWeekSumAggregateOutputType = {
    weekNumber: number | null
  }

  export type PlanWeekMinAggregateOutputType = {
    id: string | null
    weekNumber: number | null
    dateRange: string | null
    seasonPhase: string | null
    trainingPlanId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanWeekMaxAggregateOutputType = {
    id: string | null
    weekNumber: number | null
    dateRange: string | null
    seasonPhase: string | null
    trainingPlanId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanWeekCountAggregateOutputType = {
    id: number
    weekNumber: number
    dateRange: number
    seasonPhase: number
    trainingPlanId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanWeekAvgAggregateInputType = {
    weekNumber?: true
  }

  export type PlanWeekSumAggregateInputType = {
    weekNumber?: true
  }

  export type PlanWeekMinAggregateInputType = {
    id?: true
    weekNumber?: true
    dateRange?: true
    seasonPhase?: true
    trainingPlanId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanWeekMaxAggregateInputType = {
    id?: true
    weekNumber?: true
    dateRange?: true
    seasonPhase?: true
    trainingPlanId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanWeekCountAggregateInputType = {
    id?: true
    weekNumber?: true
    dateRange?: true
    seasonPhase?: true
    trainingPlanId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanWeekAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanWeek to aggregate.
     */
    where?: PlanWeekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanWeeks to fetch.
     */
    orderBy?: PlanWeekOrderByWithRelationInput | PlanWeekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWeekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanWeeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanWeeks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanWeeks
    **/
    _count?: true | PlanWeekCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanWeekAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanWeekSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanWeekMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanWeekMaxAggregateInputType
  }

  export type GetPlanWeekAggregateType<T extends PlanWeekAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanWeek]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanWeek[P]>
      : GetScalarType<T[P], AggregatePlanWeek[P]>
  }




  export type PlanWeekGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWeekWhereInput
    orderBy?: PlanWeekOrderByWithAggregationInput | PlanWeekOrderByWithAggregationInput[]
    by: PlanWeekScalarFieldEnum[] | PlanWeekScalarFieldEnum
    having?: PlanWeekScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanWeekCountAggregateInputType | true
    _avg?: PlanWeekAvgAggregateInputType
    _sum?: PlanWeekSumAggregateInputType
    _min?: PlanWeekMinAggregateInputType
    _max?: PlanWeekMaxAggregateInputType
  }

  export type PlanWeekGroupByOutputType = {
    id: string
    weekNumber: number
    dateRange: string
    seasonPhase: string | null
    trainingPlanId: string
    createdAt: Date
    updatedAt: Date
    _count: PlanWeekCountAggregateOutputType | null
    _avg: PlanWeekAvgAggregateOutputType | null
    _sum: PlanWeekSumAggregateOutputType | null
    _min: PlanWeekMinAggregateOutputType | null
    _max: PlanWeekMaxAggregateOutputType | null
  }

  type GetPlanWeekGroupByPayload<T extends PlanWeekGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanWeekGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanWeekGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanWeekGroupByOutputType[P]>
            : GetScalarType<T[P], PlanWeekGroupByOutputType[P]>
        }
      >
    >


  export type PlanWeekSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weekNumber?: boolean
    dateRange?: boolean
    seasonPhase?: boolean
    trainingPlanId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    workouts?: boolean | PlanWeek$workoutsArgs<ExtArgs>
    _count?: boolean | PlanWeekCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planWeek"]>

  export type PlanWeekSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weekNumber?: boolean
    dateRange?: boolean
    seasonPhase?: boolean
    trainingPlanId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planWeek"]>

  export type PlanWeekSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weekNumber?: boolean
    dateRange?: boolean
    seasonPhase?: boolean
    trainingPlanId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planWeek"]>

  export type PlanWeekSelectScalar = {
    id?: boolean
    weekNumber?: boolean
    dateRange?: boolean
    seasonPhase?: boolean
    trainingPlanId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanWeekOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "weekNumber" | "dateRange" | "seasonPhase" | "trainingPlanId" | "createdAt" | "updatedAt", ExtArgs["result"]["planWeek"]>
  export type PlanWeekInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    workouts?: boolean | PlanWeek$workoutsArgs<ExtArgs>
    _count?: boolean | PlanWeekCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanWeekIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }
  export type PlanWeekIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }

  export type $PlanWeekPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanWeek"
    objects: {
      trainingPlan: Prisma.$TrainingPlanPayload<ExtArgs>
      workouts: Prisma.$PlanWorkoutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      weekNumber: number
      dateRange: string
      seasonPhase: string | null
      trainingPlanId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["planWeek"]>
    composites: {}
  }

  type PlanWeekGetPayload<S extends boolean | null | undefined | PlanWeekDefaultArgs> = $Result.GetResult<Prisma.$PlanWeekPayload, S>

  type PlanWeekCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanWeekFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanWeekCountAggregateInputType | true
    }

  export interface PlanWeekDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanWeek'], meta: { name: 'PlanWeek' } }
    /**
     * Find zero or one PlanWeek that matches the filter.
     * @param {PlanWeekFindUniqueArgs} args - Arguments to find a PlanWeek
     * @example
     * // Get one PlanWeek
     * const planWeek = await prisma.planWeek.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanWeekFindUniqueArgs>(args: SelectSubset<T, PlanWeekFindUniqueArgs<ExtArgs>>): Prisma__PlanWeekClient<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlanWeek that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanWeekFindUniqueOrThrowArgs} args - Arguments to find a PlanWeek
     * @example
     * // Get one PlanWeek
     * const planWeek = await prisma.planWeek.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanWeekFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanWeekFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanWeekClient<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanWeek that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWeekFindFirstArgs} args - Arguments to find a PlanWeek
     * @example
     * // Get one PlanWeek
     * const planWeek = await prisma.planWeek.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanWeekFindFirstArgs>(args?: SelectSubset<T, PlanWeekFindFirstArgs<ExtArgs>>): Prisma__PlanWeekClient<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanWeek that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWeekFindFirstOrThrowArgs} args - Arguments to find a PlanWeek
     * @example
     * // Get one PlanWeek
     * const planWeek = await prisma.planWeek.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanWeekFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanWeekFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanWeekClient<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlanWeeks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWeekFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanWeeks
     * const planWeeks = await prisma.planWeek.findMany()
     * 
     * // Get first 10 PlanWeeks
     * const planWeeks = await prisma.planWeek.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWeekWithIdOnly = await prisma.planWeek.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanWeekFindManyArgs>(args?: SelectSubset<T, PlanWeekFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlanWeek.
     * @param {PlanWeekCreateArgs} args - Arguments to create a PlanWeek.
     * @example
     * // Create one PlanWeek
     * const PlanWeek = await prisma.planWeek.create({
     *   data: {
     *     // ... data to create a PlanWeek
     *   }
     * })
     * 
     */
    create<T extends PlanWeekCreateArgs>(args: SelectSubset<T, PlanWeekCreateArgs<ExtArgs>>): Prisma__PlanWeekClient<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlanWeeks.
     * @param {PlanWeekCreateManyArgs} args - Arguments to create many PlanWeeks.
     * @example
     * // Create many PlanWeeks
     * const planWeek = await prisma.planWeek.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanWeekCreateManyArgs>(args?: SelectSubset<T, PlanWeekCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlanWeeks and returns the data saved in the database.
     * @param {PlanWeekCreateManyAndReturnArgs} args - Arguments to create many PlanWeeks.
     * @example
     * // Create many PlanWeeks
     * const planWeek = await prisma.planWeek.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlanWeeks and only return the `id`
     * const planWeekWithIdOnly = await prisma.planWeek.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanWeekCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanWeekCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlanWeek.
     * @param {PlanWeekDeleteArgs} args - Arguments to delete one PlanWeek.
     * @example
     * // Delete one PlanWeek
     * const PlanWeek = await prisma.planWeek.delete({
     *   where: {
     *     // ... filter to delete one PlanWeek
     *   }
     * })
     * 
     */
    delete<T extends PlanWeekDeleteArgs>(args: SelectSubset<T, PlanWeekDeleteArgs<ExtArgs>>): Prisma__PlanWeekClient<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlanWeek.
     * @param {PlanWeekUpdateArgs} args - Arguments to update one PlanWeek.
     * @example
     * // Update one PlanWeek
     * const planWeek = await prisma.planWeek.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanWeekUpdateArgs>(args: SelectSubset<T, PlanWeekUpdateArgs<ExtArgs>>): Prisma__PlanWeekClient<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlanWeeks.
     * @param {PlanWeekDeleteManyArgs} args - Arguments to filter PlanWeeks to delete.
     * @example
     * // Delete a few PlanWeeks
     * const { count } = await prisma.planWeek.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanWeekDeleteManyArgs>(args?: SelectSubset<T, PlanWeekDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanWeeks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWeekUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanWeeks
     * const planWeek = await prisma.planWeek.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanWeekUpdateManyArgs>(args: SelectSubset<T, PlanWeekUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanWeeks and returns the data updated in the database.
     * @param {PlanWeekUpdateManyAndReturnArgs} args - Arguments to update many PlanWeeks.
     * @example
     * // Update many PlanWeeks
     * const planWeek = await prisma.planWeek.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlanWeeks and only return the `id`
     * const planWeekWithIdOnly = await prisma.planWeek.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanWeekUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanWeekUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlanWeek.
     * @param {PlanWeekUpsertArgs} args - Arguments to update or create a PlanWeek.
     * @example
     * // Update or create a PlanWeek
     * const planWeek = await prisma.planWeek.upsert({
     *   create: {
     *     // ... data to create a PlanWeek
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanWeek we want to update
     *   }
     * })
     */
    upsert<T extends PlanWeekUpsertArgs>(args: SelectSubset<T, PlanWeekUpsertArgs<ExtArgs>>): Prisma__PlanWeekClient<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlanWeeks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWeekCountArgs} args - Arguments to filter PlanWeeks to count.
     * @example
     * // Count the number of PlanWeeks
     * const count = await prisma.planWeek.count({
     *   where: {
     *     // ... the filter for the PlanWeeks we want to count
     *   }
     * })
    **/
    count<T extends PlanWeekCountArgs>(
      args?: Subset<T, PlanWeekCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanWeekCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanWeek.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWeekAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanWeekAggregateArgs>(args: Subset<T, PlanWeekAggregateArgs>): Prisma.PrismaPromise<GetPlanWeekAggregateType<T>>

    /**
     * Group by PlanWeek.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWeekGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanWeekGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanWeekGroupByArgs['orderBy'] }
        : { orderBy?: PlanWeekGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanWeekGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanWeekGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanWeek model
   */
  readonly fields: PlanWeekFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanWeek.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanWeekClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainingPlan<T extends TrainingPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingPlanDefaultArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workouts<T extends PlanWeek$workoutsArgs<ExtArgs> = {}>(args?: Subset<T, PlanWeek$workoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlanWeek model
   */
  interface PlanWeekFieldRefs {
    readonly id: FieldRef<"PlanWeek", 'String'>
    readonly weekNumber: FieldRef<"PlanWeek", 'Int'>
    readonly dateRange: FieldRef<"PlanWeek", 'String'>
    readonly seasonPhase: FieldRef<"PlanWeek", 'String'>
    readonly trainingPlanId: FieldRef<"PlanWeek", 'String'>
    readonly createdAt: FieldRef<"PlanWeek", 'DateTime'>
    readonly updatedAt: FieldRef<"PlanWeek", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlanWeek findUnique
   */
  export type PlanWeekFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    /**
     * Filter, which PlanWeek to fetch.
     */
    where: PlanWeekWhereUniqueInput
  }

  /**
   * PlanWeek findUniqueOrThrow
   */
  export type PlanWeekFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    /**
     * Filter, which PlanWeek to fetch.
     */
    where: PlanWeekWhereUniqueInput
  }

  /**
   * PlanWeek findFirst
   */
  export type PlanWeekFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    /**
     * Filter, which PlanWeek to fetch.
     */
    where?: PlanWeekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanWeeks to fetch.
     */
    orderBy?: PlanWeekOrderByWithRelationInput | PlanWeekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanWeeks.
     */
    cursor?: PlanWeekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanWeeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanWeeks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanWeeks.
     */
    distinct?: PlanWeekScalarFieldEnum | PlanWeekScalarFieldEnum[]
  }

  /**
   * PlanWeek findFirstOrThrow
   */
  export type PlanWeekFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    /**
     * Filter, which PlanWeek to fetch.
     */
    where?: PlanWeekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanWeeks to fetch.
     */
    orderBy?: PlanWeekOrderByWithRelationInput | PlanWeekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanWeeks.
     */
    cursor?: PlanWeekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanWeeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanWeeks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanWeeks.
     */
    distinct?: PlanWeekScalarFieldEnum | PlanWeekScalarFieldEnum[]
  }

  /**
   * PlanWeek findMany
   */
  export type PlanWeekFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    /**
     * Filter, which PlanWeeks to fetch.
     */
    where?: PlanWeekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanWeeks to fetch.
     */
    orderBy?: PlanWeekOrderByWithRelationInput | PlanWeekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanWeeks.
     */
    cursor?: PlanWeekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanWeeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanWeeks.
     */
    skip?: number
    distinct?: PlanWeekScalarFieldEnum | PlanWeekScalarFieldEnum[]
  }

  /**
   * PlanWeek create
   */
  export type PlanWeekCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    /**
     * The data needed to create a PlanWeek.
     */
    data: XOR<PlanWeekCreateInput, PlanWeekUncheckedCreateInput>
  }

  /**
   * PlanWeek createMany
   */
  export type PlanWeekCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanWeeks.
     */
    data: PlanWeekCreateManyInput | PlanWeekCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlanWeek createManyAndReturn
   */
  export type PlanWeekCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * The data used to create many PlanWeeks.
     */
    data: PlanWeekCreateManyInput | PlanWeekCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanWeek update
   */
  export type PlanWeekUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    /**
     * The data needed to update a PlanWeek.
     */
    data: XOR<PlanWeekUpdateInput, PlanWeekUncheckedUpdateInput>
    /**
     * Choose, which PlanWeek to update.
     */
    where: PlanWeekWhereUniqueInput
  }

  /**
   * PlanWeek updateMany
   */
  export type PlanWeekUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanWeeks.
     */
    data: XOR<PlanWeekUpdateManyMutationInput, PlanWeekUncheckedUpdateManyInput>
    /**
     * Filter which PlanWeeks to update
     */
    where?: PlanWeekWhereInput
    /**
     * Limit how many PlanWeeks to update.
     */
    limit?: number
  }

  /**
   * PlanWeek updateManyAndReturn
   */
  export type PlanWeekUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * The data used to update PlanWeeks.
     */
    data: XOR<PlanWeekUpdateManyMutationInput, PlanWeekUncheckedUpdateManyInput>
    /**
     * Filter which PlanWeeks to update
     */
    where?: PlanWeekWhereInput
    /**
     * Limit how many PlanWeeks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanWeek upsert
   */
  export type PlanWeekUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    /**
     * The filter to search for the PlanWeek to update in case it exists.
     */
    where: PlanWeekWhereUniqueInput
    /**
     * In case the PlanWeek found by the `where` argument doesn't exist, create a new PlanWeek with this data.
     */
    create: XOR<PlanWeekCreateInput, PlanWeekUncheckedCreateInput>
    /**
     * In case the PlanWeek was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanWeekUpdateInput, PlanWeekUncheckedUpdateInput>
  }

  /**
   * PlanWeek delete
   */
  export type PlanWeekDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
    /**
     * Filter which PlanWeek to delete.
     */
    where: PlanWeekWhereUniqueInput
  }

  /**
   * PlanWeek deleteMany
   */
  export type PlanWeekDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanWeeks to delete
     */
    where?: PlanWeekWhereInput
    /**
     * Limit how many PlanWeeks to delete.
     */
    limit?: number
  }

  /**
   * PlanWeek.workouts
   */
  export type PlanWeek$workoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    where?: PlanWorkoutWhereInput
    orderBy?: PlanWorkoutOrderByWithRelationInput | PlanWorkoutOrderByWithRelationInput[]
    cursor?: PlanWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanWorkoutScalarFieldEnum | PlanWorkoutScalarFieldEnum[]
  }

  /**
   * PlanWeek without action
   */
  export type PlanWeekDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWeek
     */
    select?: PlanWeekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWeek
     */
    omit?: PlanWeekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWeekInclude<ExtArgs> | null
  }


  /**
   * Model WorkoutType
   */

  export type AggregateWorkoutType = {
    _count: WorkoutTypeCountAggregateOutputType | null
    _min: WorkoutTypeMinAggregateOutputType | null
    _max: WorkoutTypeMaxAggregateOutputType | null
  }

  export type WorkoutTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutTypeCountAggregateOutputType = {
    id: number
    name: number
    color: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkoutTypeMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutTypeMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutTypeCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkoutTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutType to aggregate.
     */
    where?: WorkoutTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutTypes to fetch.
     */
    orderBy?: WorkoutTypeOrderByWithRelationInput | WorkoutTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkoutTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkoutTypes
    **/
    _count?: true | WorkoutTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkoutTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkoutTypeMaxAggregateInputType
  }

  export type GetWorkoutTypeAggregateType<T extends WorkoutTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkoutType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkoutType[P]>
      : GetScalarType<T[P], AggregateWorkoutType[P]>
  }




  export type WorkoutTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutTypeWhereInput
    orderBy?: WorkoutTypeOrderByWithAggregationInput | WorkoutTypeOrderByWithAggregationInput[]
    by: WorkoutTypeScalarFieldEnum[] | WorkoutTypeScalarFieldEnum
    having?: WorkoutTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkoutTypeCountAggregateInputType | true
    _min?: WorkoutTypeMinAggregateInputType
    _max?: WorkoutTypeMaxAggregateInputType
  }

  export type WorkoutTypeGroupByOutputType = {
    id: string
    name: string
    color: string
    createdAt: Date
    updatedAt: Date
    _count: WorkoutTypeCountAggregateOutputType | null
    _min: WorkoutTypeMinAggregateOutputType | null
    _max: WorkoutTypeMaxAggregateOutputType | null
  }

  type GetWorkoutTypeGroupByPayload<T extends WorkoutTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkoutTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkoutTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkoutTypeGroupByOutputType[P]>
            : GetScalarType<T[P], WorkoutTypeGroupByOutputType[P]>
        }
      >
    >


  export type WorkoutTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workouts?: boolean | WorkoutType$workoutsArgs<ExtArgs>
    _count?: boolean | WorkoutTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutType"]>

  export type WorkoutTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workoutType"]>

  export type WorkoutTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workoutType"]>

  export type WorkoutTypeSelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkoutTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color" | "createdAt" | "updatedAt", ExtArgs["result"]["workoutType"]>
  export type WorkoutTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workouts?: boolean | WorkoutType$workoutsArgs<ExtArgs>
    _count?: boolean | WorkoutTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkoutTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WorkoutTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorkoutTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkoutType"
    objects: {
      workouts: Prisma.$PlanWorkoutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      color: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workoutType"]>
    composites: {}
  }

  type WorkoutTypeGetPayload<S extends boolean | null | undefined | WorkoutTypeDefaultArgs> = $Result.GetResult<Prisma.$WorkoutTypePayload, S>

  type WorkoutTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkoutTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkoutTypeCountAggregateInputType | true
    }

  export interface WorkoutTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkoutType'], meta: { name: 'WorkoutType' } }
    /**
     * Find zero or one WorkoutType that matches the filter.
     * @param {WorkoutTypeFindUniqueArgs} args - Arguments to find a WorkoutType
     * @example
     * // Get one WorkoutType
     * const workoutType = await prisma.workoutType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutTypeFindUniqueArgs>(args: SelectSubset<T, WorkoutTypeFindUniqueArgs<ExtArgs>>): Prisma__WorkoutTypeClient<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkoutType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutTypeFindUniqueOrThrowArgs} args - Arguments to find a WorkoutType
     * @example
     * // Get one WorkoutType
     * const workoutType = await prisma.workoutType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkoutTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkoutTypeClient<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutTypeFindFirstArgs} args - Arguments to find a WorkoutType
     * @example
     * // Get one WorkoutType
     * const workoutType = await prisma.workoutType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutTypeFindFirstArgs>(args?: SelectSubset<T, WorkoutTypeFindFirstArgs<ExtArgs>>): Prisma__WorkoutTypeClient<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutTypeFindFirstOrThrowArgs} args - Arguments to find a WorkoutType
     * @example
     * // Get one WorkoutType
     * const workoutType = await prisma.workoutType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkoutTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkoutTypeClient<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkoutTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkoutTypes
     * const workoutTypes = await prisma.workoutType.findMany()
     * 
     * // Get first 10 WorkoutTypes
     * const workoutTypes = await prisma.workoutType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workoutTypeWithIdOnly = await prisma.workoutType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkoutTypeFindManyArgs>(args?: SelectSubset<T, WorkoutTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkoutType.
     * @param {WorkoutTypeCreateArgs} args - Arguments to create a WorkoutType.
     * @example
     * // Create one WorkoutType
     * const WorkoutType = await prisma.workoutType.create({
     *   data: {
     *     // ... data to create a WorkoutType
     *   }
     * })
     * 
     */
    create<T extends WorkoutTypeCreateArgs>(args: SelectSubset<T, WorkoutTypeCreateArgs<ExtArgs>>): Prisma__WorkoutTypeClient<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkoutTypes.
     * @param {WorkoutTypeCreateManyArgs} args - Arguments to create many WorkoutTypes.
     * @example
     * // Create many WorkoutTypes
     * const workoutType = await prisma.workoutType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkoutTypeCreateManyArgs>(args?: SelectSubset<T, WorkoutTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkoutTypes and returns the data saved in the database.
     * @param {WorkoutTypeCreateManyAndReturnArgs} args - Arguments to create many WorkoutTypes.
     * @example
     * // Create many WorkoutTypes
     * const workoutType = await prisma.workoutType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkoutTypes and only return the `id`
     * const workoutTypeWithIdOnly = await prisma.workoutType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkoutTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkoutTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkoutType.
     * @param {WorkoutTypeDeleteArgs} args - Arguments to delete one WorkoutType.
     * @example
     * // Delete one WorkoutType
     * const WorkoutType = await prisma.workoutType.delete({
     *   where: {
     *     // ... filter to delete one WorkoutType
     *   }
     * })
     * 
     */
    delete<T extends WorkoutTypeDeleteArgs>(args: SelectSubset<T, WorkoutTypeDeleteArgs<ExtArgs>>): Prisma__WorkoutTypeClient<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkoutType.
     * @param {WorkoutTypeUpdateArgs} args - Arguments to update one WorkoutType.
     * @example
     * // Update one WorkoutType
     * const workoutType = await prisma.workoutType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkoutTypeUpdateArgs>(args: SelectSubset<T, WorkoutTypeUpdateArgs<ExtArgs>>): Prisma__WorkoutTypeClient<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkoutTypes.
     * @param {WorkoutTypeDeleteManyArgs} args - Arguments to filter WorkoutTypes to delete.
     * @example
     * // Delete a few WorkoutTypes
     * const { count } = await prisma.workoutType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkoutTypeDeleteManyArgs>(args?: SelectSubset<T, WorkoutTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkoutTypes
     * const workoutType = await prisma.workoutType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkoutTypeUpdateManyArgs>(args: SelectSubset<T, WorkoutTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutTypes and returns the data updated in the database.
     * @param {WorkoutTypeUpdateManyAndReturnArgs} args - Arguments to update many WorkoutTypes.
     * @example
     * // Update many WorkoutTypes
     * const workoutType = await prisma.workoutType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkoutTypes and only return the `id`
     * const workoutTypeWithIdOnly = await prisma.workoutType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkoutTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkoutTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkoutType.
     * @param {WorkoutTypeUpsertArgs} args - Arguments to update or create a WorkoutType.
     * @example
     * // Update or create a WorkoutType
     * const workoutType = await prisma.workoutType.upsert({
     *   create: {
     *     // ... data to create a WorkoutType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkoutType we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutTypeUpsertArgs>(args: SelectSubset<T, WorkoutTypeUpsertArgs<ExtArgs>>): Prisma__WorkoutTypeClient<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkoutTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutTypeCountArgs} args - Arguments to filter WorkoutTypes to count.
     * @example
     * // Count the number of WorkoutTypes
     * const count = await prisma.workoutType.count({
     *   where: {
     *     // ... the filter for the WorkoutTypes we want to count
     *   }
     * })
    **/
    count<T extends WorkoutTypeCountArgs>(
      args?: Subset<T, WorkoutTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkoutType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkoutTypeAggregateArgs>(args: Subset<T, WorkoutTypeAggregateArgs>): Prisma.PrismaPromise<GetWorkoutTypeAggregateType<T>>

    /**
     * Group by WorkoutType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkoutTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutTypeGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkoutTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkoutTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkoutType model
   */
  readonly fields: WorkoutTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkoutType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workouts<T extends WorkoutType$workoutsArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutType$workoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkoutType model
   */
  interface WorkoutTypeFieldRefs {
    readonly id: FieldRef<"WorkoutType", 'String'>
    readonly name: FieldRef<"WorkoutType", 'String'>
    readonly color: FieldRef<"WorkoutType", 'String'>
    readonly createdAt: FieldRef<"WorkoutType", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkoutType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkoutType findUnique
   */
  export type WorkoutTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutType to fetch.
     */
    where: WorkoutTypeWhereUniqueInput
  }

  /**
   * WorkoutType findUniqueOrThrow
   */
  export type WorkoutTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutType to fetch.
     */
    where: WorkoutTypeWhereUniqueInput
  }

  /**
   * WorkoutType findFirst
   */
  export type WorkoutTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutType to fetch.
     */
    where?: WorkoutTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutTypes to fetch.
     */
    orderBy?: WorkoutTypeOrderByWithRelationInput | WorkoutTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutTypes.
     */
    cursor?: WorkoutTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutTypes.
     */
    distinct?: WorkoutTypeScalarFieldEnum | WorkoutTypeScalarFieldEnum[]
  }

  /**
   * WorkoutType findFirstOrThrow
   */
  export type WorkoutTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutType to fetch.
     */
    where?: WorkoutTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutTypes to fetch.
     */
    orderBy?: WorkoutTypeOrderByWithRelationInput | WorkoutTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutTypes.
     */
    cursor?: WorkoutTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutTypes.
     */
    distinct?: WorkoutTypeScalarFieldEnum | WorkoutTypeScalarFieldEnum[]
  }

  /**
   * WorkoutType findMany
   */
  export type WorkoutTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutTypes to fetch.
     */
    where?: WorkoutTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutTypes to fetch.
     */
    orderBy?: WorkoutTypeOrderByWithRelationInput | WorkoutTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkoutTypes.
     */
    cursor?: WorkoutTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutTypes.
     */
    skip?: number
    distinct?: WorkoutTypeScalarFieldEnum | WorkoutTypeScalarFieldEnum[]
  }

  /**
   * WorkoutType create
   */
  export type WorkoutTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkoutType.
     */
    data: XOR<WorkoutTypeCreateInput, WorkoutTypeUncheckedCreateInput>
  }

  /**
   * WorkoutType createMany
   */
  export type WorkoutTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkoutTypes.
     */
    data: WorkoutTypeCreateManyInput | WorkoutTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkoutType createManyAndReturn
   */
  export type WorkoutTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * The data used to create many WorkoutTypes.
     */
    data: WorkoutTypeCreateManyInput | WorkoutTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkoutType update
   */
  export type WorkoutTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkoutType.
     */
    data: XOR<WorkoutTypeUpdateInput, WorkoutTypeUncheckedUpdateInput>
    /**
     * Choose, which WorkoutType to update.
     */
    where: WorkoutTypeWhereUniqueInput
  }

  /**
   * WorkoutType updateMany
   */
  export type WorkoutTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkoutTypes.
     */
    data: XOR<WorkoutTypeUpdateManyMutationInput, WorkoutTypeUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutTypes to update
     */
    where?: WorkoutTypeWhereInput
    /**
     * Limit how many WorkoutTypes to update.
     */
    limit?: number
  }

  /**
   * WorkoutType updateManyAndReturn
   */
  export type WorkoutTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * The data used to update WorkoutTypes.
     */
    data: XOR<WorkoutTypeUpdateManyMutationInput, WorkoutTypeUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutTypes to update
     */
    where?: WorkoutTypeWhereInput
    /**
     * Limit how many WorkoutTypes to update.
     */
    limit?: number
  }

  /**
   * WorkoutType upsert
   */
  export type WorkoutTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkoutType to update in case it exists.
     */
    where: WorkoutTypeWhereUniqueInput
    /**
     * In case the WorkoutType found by the `where` argument doesn't exist, create a new WorkoutType with this data.
     */
    create: XOR<WorkoutTypeCreateInput, WorkoutTypeUncheckedCreateInput>
    /**
     * In case the WorkoutType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutTypeUpdateInput, WorkoutTypeUncheckedUpdateInput>
  }

  /**
   * WorkoutType delete
   */
  export type WorkoutTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
    /**
     * Filter which WorkoutType to delete.
     */
    where: WorkoutTypeWhereUniqueInput
  }

  /**
   * WorkoutType deleteMany
   */
  export type WorkoutTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutTypes to delete
     */
    where?: WorkoutTypeWhereInput
    /**
     * Limit how many WorkoutTypes to delete.
     */
    limit?: number
  }

  /**
   * WorkoutType.workouts
   */
  export type WorkoutType$workoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    where?: PlanWorkoutWhereInput
    orderBy?: PlanWorkoutOrderByWithRelationInput | PlanWorkoutOrderByWithRelationInput[]
    cursor?: PlanWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanWorkoutScalarFieldEnum | PlanWorkoutScalarFieldEnum[]
  }

  /**
   * WorkoutType without action
   */
  export type WorkoutTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutType
     */
    select?: WorkoutTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutType
     */
    omit?: WorkoutTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutTypeInclude<ExtArgs> | null
  }


  /**
   * Model PlanWorkout
   */

  export type AggregatePlanWorkout = {
    _count: PlanWorkoutCountAggregateOutputType | null
    _min: PlanWorkoutMinAggregateOutputType | null
    _max: PlanWorkoutMaxAggregateOutputType | null
  }

  export type PlanWorkoutMinAggregateOutputType = {
    id: string | null
    details: string | null
    weekId: string | null
    workoutTypeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanWorkoutMaxAggregateOutputType = {
    id: string | null
    details: string | null
    weekId: string | null
    workoutTypeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanWorkoutCountAggregateOutputType = {
    id: number
    details: number
    weekId: number
    workoutTypeId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanWorkoutMinAggregateInputType = {
    id?: true
    details?: true
    weekId?: true
    workoutTypeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanWorkoutMaxAggregateInputType = {
    id?: true
    details?: true
    weekId?: true
    workoutTypeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanWorkoutCountAggregateInputType = {
    id?: true
    details?: true
    weekId?: true
    workoutTypeId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanWorkoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanWorkout to aggregate.
     */
    where?: PlanWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanWorkouts to fetch.
     */
    orderBy?: PlanWorkoutOrderByWithRelationInput | PlanWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanWorkouts
    **/
    _count?: true | PlanWorkoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanWorkoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanWorkoutMaxAggregateInputType
  }

  export type GetPlanWorkoutAggregateType<T extends PlanWorkoutAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanWorkout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanWorkout[P]>
      : GetScalarType<T[P], AggregatePlanWorkout[P]>
  }




  export type PlanWorkoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWorkoutWhereInput
    orderBy?: PlanWorkoutOrderByWithAggregationInput | PlanWorkoutOrderByWithAggregationInput[]
    by: PlanWorkoutScalarFieldEnum[] | PlanWorkoutScalarFieldEnum
    having?: PlanWorkoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanWorkoutCountAggregateInputType | true
    _min?: PlanWorkoutMinAggregateInputType
    _max?: PlanWorkoutMaxAggregateInputType
  }

  export type PlanWorkoutGroupByOutputType = {
    id: string
    details: string | null
    weekId: string
    workoutTypeId: string
    createdAt: Date
    updatedAt: Date
    _count: PlanWorkoutCountAggregateOutputType | null
    _min: PlanWorkoutMinAggregateOutputType | null
    _max: PlanWorkoutMaxAggregateOutputType | null
  }

  type GetPlanWorkoutGroupByPayload<T extends PlanWorkoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanWorkoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanWorkoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanWorkoutGroupByOutputType[P]>
            : GetScalarType<T[P], PlanWorkoutGroupByOutputType[P]>
        }
      >
    >


  export type PlanWorkoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    details?: boolean
    weekId?: boolean
    workoutTypeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    week?: boolean | PlanWeekDefaultArgs<ExtArgs>
    workoutType?: boolean | WorkoutTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planWorkout"]>

  export type PlanWorkoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    details?: boolean
    weekId?: boolean
    workoutTypeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    week?: boolean | PlanWeekDefaultArgs<ExtArgs>
    workoutType?: boolean | WorkoutTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planWorkout"]>

  export type PlanWorkoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    details?: boolean
    weekId?: boolean
    workoutTypeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    week?: boolean | PlanWeekDefaultArgs<ExtArgs>
    workoutType?: boolean | WorkoutTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planWorkout"]>

  export type PlanWorkoutSelectScalar = {
    id?: boolean
    details?: boolean
    weekId?: boolean
    workoutTypeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanWorkoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "details" | "weekId" | "workoutTypeId" | "createdAt" | "updatedAt", ExtArgs["result"]["planWorkout"]>
  export type PlanWorkoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    week?: boolean | PlanWeekDefaultArgs<ExtArgs>
    workoutType?: boolean | WorkoutTypeDefaultArgs<ExtArgs>
  }
  export type PlanWorkoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    week?: boolean | PlanWeekDefaultArgs<ExtArgs>
    workoutType?: boolean | WorkoutTypeDefaultArgs<ExtArgs>
  }
  export type PlanWorkoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    week?: boolean | PlanWeekDefaultArgs<ExtArgs>
    workoutType?: boolean | WorkoutTypeDefaultArgs<ExtArgs>
  }

  export type $PlanWorkoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanWorkout"
    objects: {
      week: Prisma.$PlanWeekPayload<ExtArgs>
      workoutType: Prisma.$WorkoutTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      details: string | null
      weekId: string
      workoutTypeId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["planWorkout"]>
    composites: {}
  }

  type PlanWorkoutGetPayload<S extends boolean | null | undefined | PlanWorkoutDefaultArgs> = $Result.GetResult<Prisma.$PlanWorkoutPayload, S>

  type PlanWorkoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanWorkoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanWorkoutCountAggregateInputType | true
    }

  export interface PlanWorkoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanWorkout'], meta: { name: 'PlanWorkout' } }
    /**
     * Find zero or one PlanWorkout that matches the filter.
     * @param {PlanWorkoutFindUniqueArgs} args - Arguments to find a PlanWorkout
     * @example
     * // Get one PlanWorkout
     * const planWorkout = await prisma.planWorkout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanWorkoutFindUniqueArgs>(args: SelectSubset<T, PlanWorkoutFindUniqueArgs<ExtArgs>>): Prisma__PlanWorkoutClient<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlanWorkout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanWorkoutFindUniqueOrThrowArgs} args - Arguments to find a PlanWorkout
     * @example
     * // Get one PlanWorkout
     * const planWorkout = await prisma.planWorkout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanWorkoutFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanWorkoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanWorkoutClient<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanWorkout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWorkoutFindFirstArgs} args - Arguments to find a PlanWorkout
     * @example
     * // Get one PlanWorkout
     * const planWorkout = await prisma.planWorkout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanWorkoutFindFirstArgs>(args?: SelectSubset<T, PlanWorkoutFindFirstArgs<ExtArgs>>): Prisma__PlanWorkoutClient<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanWorkout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWorkoutFindFirstOrThrowArgs} args - Arguments to find a PlanWorkout
     * @example
     * // Get one PlanWorkout
     * const planWorkout = await prisma.planWorkout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanWorkoutFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanWorkoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanWorkoutClient<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlanWorkouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWorkoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanWorkouts
     * const planWorkouts = await prisma.planWorkout.findMany()
     * 
     * // Get first 10 PlanWorkouts
     * const planWorkouts = await prisma.planWorkout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWorkoutWithIdOnly = await prisma.planWorkout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanWorkoutFindManyArgs>(args?: SelectSubset<T, PlanWorkoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlanWorkout.
     * @param {PlanWorkoutCreateArgs} args - Arguments to create a PlanWorkout.
     * @example
     * // Create one PlanWorkout
     * const PlanWorkout = await prisma.planWorkout.create({
     *   data: {
     *     // ... data to create a PlanWorkout
     *   }
     * })
     * 
     */
    create<T extends PlanWorkoutCreateArgs>(args: SelectSubset<T, PlanWorkoutCreateArgs<ExtArgs>>): Prisma__PlanWorkoutClient<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlanWorkouts.
     * @param {PlanWorkoutCreateManyArgs} args - Arguments to create many PlanWorkouts.
     * @example
     * // Create many PlanWorkouts
     * const planWorkout = await prisma.planWorkout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanWorkoutCreateManyArgs>(args?: SelectSubset<T, PlanWorkoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlanWorkouts and returns the data saved in the database.
     * @param {PlanWorkoutCreateManyAndReturnArgs} args - Arguments to create many PlanWorkouts.
     * @example
     * // Create many PlanWorkouts
     * const planWorkout = await prisma.planWorkout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlanWorkouts and only return the `id`
     * const planWorkoutWithIdOnly = await prisma.planWorkout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanWorkoutCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanWorkoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlanWorkout.
     * @param {PlanWorkoutDeleteArgs} args - Arguments to delete one PlanWorkout.
     * @example
     * // Delete one PlanWorkout
     * const PlanWorkout = await prisma.planWorkout.delete({
     *   where: {
     *     // ... filter to delete one PlanWorkout
     *   }
     * })
     * 
     */
    delete<T extends PlanWorkoutDeleteArgs>(args: SelectSubset<T, PlanWorkoutDeleteArgs<ExtArgs>>): Prisma__PlanWorkoutClient<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlanWorkout.
     * @param {PlanWorkoutUpdateArgs} args - Arguments to update one PlanWorkout.
     * @example
     * // Update one PlanWorkout
     * const planWorkout = await prisma.planWorkout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanWorkoutUpdateArgs>(args: SelectSubset<T, PlanWorkoutUpdateArgs<ExtArgs>>): Prisma__PlanWorkoutClient<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlanWorkouts.
     * @param {PlanWorkoutDeleteManyArgs} args - Arguments to filter PlanWorkouts to delete.
     * @example
     * // Delete a few PlanWorkouts
     * const { count } = await prisma.planWorkout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanWorkoutDeleteManyArgs>(args?: SelectSubset<T, PlanWorkoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanWorkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWorkoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanWorkouts
     * const planWorkout = await prisma.planWorkout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanWorkoutUpdateManyArgs>(args: SelectSubset<T, PlanWorkoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanWorkouts and returns the data updated in the database.
     * @param {PlanWorkoutUpdateManyAndReturnArgs} args - Arguments to update many PlanWorkouts.
     * @example
     * // Update many PlanWorkouts
     * const planWorkout = await prisma.planWorkout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlanWorkouts and only return the `id`
     * const planWorkoutWithIdOnly = await prisma.planWorkout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanWorkoutUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanWorkoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlanWorkout.
     * @param {PlanWorkoutUpsertArgs} args - Arguments to update or create a PlanWorkout.
     * @example
     * // Update or create a PlanWorkout
     * const planWorkout = await prisma.planWorkout.upsert({
     *   create: {
     *     // ... data to create a PlanWorkout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanWorkout we want to update
     *   }
     * })
     */
    upsert<T extends PlanWorkoutUpsertArgs>(args: SelectSubset<T, PlanWorkoutUpsertArgs<ExtArgs>>): Prisma__PlanWorkoutClient<$Result.GetResult<Prisma.$PlanWorkoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlanWorkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWorkoutCountArgs} args - Arguments to filter PlanWorkouts to count.
     * @example
     * // Count the number of PlanWorkouts
     * const count = await prisma.planWorkout.count({
     *   where: {
     *     // ... the filter for the PlanWorkouts we want to count
     *   }
     * })
    **/
    count<T extends PlanWorkoutCountArgs>(
      args?: Subset<T, PlanWorkoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanWorkoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanWorkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWorkoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanWorkoutAggregateArgs>(args: Subset<T, PlanWorkoutAggregateArgs>): Prisma.PrismaPromise<GetPlanWorkoutAggregateType<T>>

    /**
     * Group by PlanWorkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanWorkoutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanWorkoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanWorkoutGroupByArgs['orderBy'] }
        : { orderBy?: PlanWorkoutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanWorkoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanWorkoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanWorkout model
   */
  readonly fields: PlanWorkoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanWorkout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanWorkoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    week<T extends PlanWeekDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanWeekDefaultArgs<ExtArgs>>): Prisma__PlanWeekClient<$Result.GetResult<Prisma.$PlanWeekPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workoutType<T extends WorkoutTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutTypeDefaultArgs<ExtArgs>>): Prisma__WorkoutTypeClient<$Result.GetResult<Prisma.$WorkoutTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlanWorkout model
   */
  interface PlanWorkoutFieldRefs {
    readonly id: FieldRef<"PlanWorkout", 'String'>
    readonly details: FieldRef<"PlanWorkout", 'String'>
    readonly weekId: FieldRef<"PlanWorkout", 'String'>
    readonly workoutTypeId: FieldRef<"PlanWorkout", 'String'>
    readonly createdAt: FieldRef<"PlanWorkout", 'DateTime'>
    readonly updatedAt: FieldRef<"PlanWorkout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlanWorkout findUnique
   */
  export type PlanWorkoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which PlanWorkout to fetch.
     */
    where: PlanWorkoutWhereUniqueInput
  }

  /**
   * PlanWorkout findUniqueOrThrow
   */
  export type PlanWorkoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which PlanWorkout to fetch.
     */
    where: PlanWorkoutWhereUniqueInput
  }

  /**
   * PlanWorkout findFirst
   */
  export type PlanWorkoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which PlanWorkout to fetch.
     */
    where?: PlanWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanWorkouts to fetch.
     */
    orderBy?: PlanWorkoutOrderByWithRelationInput | PlanWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanWorkouts.
     */
    cursor?: PlanWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanWorkouts.
     */
    distinct?: PlanWorkoutScalarFieldEnum | PlanWorkoutScalarFieldEnum[]
  }

  /**
   * PlanWorkout findFirstOrThrow
   */
  export type PlanWorkoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which PlanWorkout to fetch.
     */
    where?: PlanWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanWorkouts to fetch.
     */
    orderBy?: PlanWorkoutOrderByWithRelationInput | PlanWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanWorkouts.
     */
    cursor?: PlanWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanWorkouts.
     */
    distinct?: PlanWorkoutScalarFieldEnum | PlanWorkoutScalarFieldEnum[]
  }

  /**
   * PlanWorkout findMany
   */
  export type PlanWorkoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which PlanWorkouts to fetch.
     */
    where?: PlanWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanWorkouts to fetch.
     */
    orderBy?: PlanWorkoutOrderByWithRelationInput | PlanWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanWorkouts.
     */
    cursor?: PlanWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanWorkouts.
     */
    skip?: number
    distinct?: PlanWorkoutScalarFieldEnum | PlanWorkoutScalarFieldEnum[]
  }

  /**
   * PlanWorkout create
   */
  export type PlanWorkoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    /**
     * The data needed to create a PlanWorkout.
     */
    data: XOR<PlanWorkoutCreateInput, PlanWorkoutUncheckedCreateInput>
  }

  /**
   * PlanWorkout createMany
   */
  export type PlanWorkoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanWorkouts.
     */
    data: PlanWorkoutCreateManyInput | PlanWorkoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlanWorkout createManyAndReturn
   */
  export type PlanWorkoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * The data used to create many PlanWorkouts.
     */
    data: PlanWorkoutCreateManyInput | PlanWorkoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanWorkout update
   */
  export type PlanWorkoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    /**
     * The data needed to update a PlanWorkout.
     */
    data: XOR<PlanWorkoutUpdateInput, PlanWorkoutUncheckedUpdateInput>
    /**
     * Choose, which PlanWorkout to update.
     */
    where: PlanWorkoutWhereUniqueInput
  }

  /**
   * PlanWorkout updateMany
   */
  export type PlanWorkoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanWorkouts.
     */
    data: XOR<PlanWorkoutUpdateManyMutationInput, PlanWorkoutUncheckedUpdateManyInput>
    /**
     * Filter which PlanWorkouts to update
     */
    where?: PlanWorkoutWhereInput
    /**
     * Limit how many PlanWorkouts to update.
     */
    limit?: number
  }

  /**
   * PlanWorkout updateManyAndReturn
   */
  export type PlanWorkoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * The data used to update PlanWorkouts.
     */
    data: XOR<PlanWorkoutUpdateManyMutationInput, PlanWorkoutUncheckedUpdateManyInput>
    /**
     * Filter which PlanWorkouts to update
     */
    where?: PlanWorkoutWhereInput
    /**
     * Limit how many PlanWorkouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanWorkout upsert
   */
  export type PlanWorkoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    /**
     * The filter to search for the PlanWorkout to update in case it exists.
     */
    where: PlanWorkoutWhereUniqueInput
    /**
     * In case the PlanWorkout found by the `where` argument doesn't exist, create a new PlanWorkout with this data.
     */
    create: XOR<PlanWorkoutCreateInput, PlanWorkoutUncheckedCreateInput>
    /**
     * In case the PlanWorkout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanWorkoutUpdateInput, PlanWorkoutUncheckedUpdateInput>
  }

  /**
   * PlanWorkout delete
   */
  export type PlanWorkoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
    /**
     * Filter which PlanWorkout to delete.
     */
    where: PlanWorkoutWhereUniqueInput
  }

  /**
   * PlanWorkout deleteMany
   */
  export type PlanWorkoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanWorkouts to delete
     */
    where?: PlanWorkoutWhereInput
    /**
     * Limit how many PlanWorkouts to delete.
     */
    limit?: number
  }

  /**
   * PlanWorkout without action
   */
  export type PlanWorkoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanWorkout
     */
    select?: PlanWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanWorkout
     */
    omit?: PlanWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanWorkoutInclude<ExtArgs> | null
  }


  /**
   * Model WorkoutResult
   */

  export type AggregateWorkoutResult = {
    _count: WorkoutResultCountAggregateOutputType | null
    _avg: WorkoutResultAvgAggregateOutputType | null
    _sum: WorkoutResultSumAggregateOutputType | null
    _min: WorkoutResultMinAggregateOutputType | null
    _max: WorkoutResultMaxAggregateOutputType | null
  }

  export type WorkoutResultAvgAggregateOutputType = {
    athleteId: number | null
  }

  export type WorkoutResultSumAggregateOutputType = {
    athleteId: number | null
  }

  export type WorkoutResultMinAggregateOutputType = {
    id: string | null
    athleteId: number | null
    date: Date | null
    type: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutResultMaxAggregateOutputType = {
    id: string | null
    athleteId: number | null
    date: Date | null
    type: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutResultCountAggregateOutputType = {
    id: number
    athleteId: number
    date: number
    type: number
    details: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkoutResultAvgAggregateInputType = {
    athleteId?: true
  }

  export type WorkoutResultSumAggregateInputType = {
    athleteId?: true
  }

  export type WorkoutResultMinAggregateInputType = {
    id?: true
    athleteId?: true
    date?: true
    type?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutResultMaxAggregateInputType = {
    id?: true
    athleteId?: true
    date?: true
    type?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutResultCountAggregateInputType = {
    id?: true
    athleteId?: true
    date?: true
    type?: true
    details?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkoutResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutResult to aggregate.
     */
    where?: WorkoutResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutResults to fetch.
     */
    orderBy?: WorkoutResultOrderByWithRelationInput | WorkoutResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkoutResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkoutResults
    **/
    _count?: true | WorkoutResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkoutResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkoutResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkoutResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkoutResultMaxAggregateInputType
  }

  export type GetWorkoutResultAggregateType<T extends WorkoutResultAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkoutResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkoutResult[P]>
      : GetScalarType<T[P], AggregateWorkoutResult[P]>
  }




  export type WorkoutResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutResultWhereInput
    orderBy?: WorkoutResultOrderByWithAggregationInput | WorkoutResultOrderByWithAggregationInput[]
    by: WorkoutResultScalarFieldEnum[] | WorkoutResultScalarFieldEnum
    having?: WorkoutResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkoutResultCountAggregateInputType | true
    _avg?: WorkoutResultAvgAggregateInputType
    _sum?: WorkoutResultSumAggregateInputType
    _min?: WorkoutResultMinAggregateInputType
    _max?: WorkoutResultMaxAggregateInputType
  }

  export type WorkoutResultGroupByOutputType = {
    id: string
    athleteId: number
    date: Date
    type: string
    details: JsonValue
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: WorkoutResultCountAggregateOutputType | null
    _avg: WorkoutResultAvgAggregateOutputType | null
    _sum: WorkoutResultSumAggregateOutputType | null
    _min: WorkoutResultMinAggregateOutputType | null
    _max: WorkoutResultMaxAggregateOutputType | null
  }

  type GetWorkoutResultGroupByPayload<T extends WorkoutResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkoutResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkoutResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkoutResultGroupByOutputType[P]>
            : GetScalarType<T[P], WorkoutResultGroupByOutputType[P]>
        }
      >
    >


  export type WorkoutResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    date?: boolean
    type?: boolean
    details?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutResult"]>

  export type WorkoutResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    date?: boolean
    type?: boolean
    details?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutResult"]>

  export type WorkoutResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    date?: boolean
    type?: boolean
    details?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutResult"]>

  export type WorkoutResultSelectScalar = {
    id?: boolean
    athleteId?: boolean
    date?: boolean
    type?: boolean
    details?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkoutResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "athleteId" | "date" | "type" | "details" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["workoutResult"]>
  export type WorkoutResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }
  export type WorkoutResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }
  export type WorkoutResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }

  export type $WorkoutResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkoutResult"
    objects: {
      athlete: Prisma.$AthletePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      athleteId: number
      date: Date
      type: string
      details: Prisma.JsonValue
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workoutResult"]>
    composites: {}
  }

  type WorkoutResultGetPayload<S extends boolean | null | undefined | WorkoutResultDefaultArgs> = $Result.GetResult<Prisma.$WorkoutResultPayload, S>

  type WorkoutResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkoutResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkoutResultCountAggregateInputType | true
    }

  export interface WorkoutResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkoutResult'], meta: { name: 'WorkoutResult' } }
    /**
     * Find zero or one WorkoutResult that matches the filter.
     * @param {WorkoutResultFindUniqueArgs} args - Arguments to find a WorkoutResult
     * @example
     * // Get one WorkoutResult
     * const workoutResult = await prisma.workoutResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutResultFindUniqueArgs>(args: SelectSubset<T, WorkoutResultFindUniqueArgs<ExtArgs>>): Prisma__WorkoutResultClient<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkoutResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutResultFindUniqueOrThrowArgs} args - Arguments to find a WorkoutResult
     * @example
     * // Get one WorkoutResult
     * const workoutResult = await prisma.workoutResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutResultFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkoutResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkoutResultClient<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutResultFindFirstArgs} args - Arguments to find a WorkoutResult
     * @example
     * // Get one WorkoutResult
     * const workoutResult = await prisma.workoutResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutResultFindFirstArgs>(args?: SelectSubset<T, WorkoutResultFindFirstArgs<ExtArgs>>): Prisma__WorkoutResultClient<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutResultFindFirstOrThrowArgs} args - Arguments to find a WorkoutResult
     * @example
     * // Get one WorkoutResult
     * const workoutResult = await prisma.workoutResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutResultFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkoutResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkoutResultClient<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkoutResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkoutResults
     * const workoutResults = await prisma.workoutResult.findMany()
     * 
     * // Get first 10 WorkoutResults
     * const workoutResults = await prisma.workoutResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workoutResultWithIdOnly = await prisma.workoutResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkoutResultFindManyArgs>(args?: SelectSubset<T, WorkoutResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkoutResult.
     * @param {WorkoutResultCreateArgs} args - Arguments to create a WorkoutResult.
     * @example
     * // Create one WorkoutResult
     * const WorkoutResult = await prisma.workoutResult.create({
     *   data: {
     *     // ... data to create a WorkoutResult
     *   }
     * })
     * 
     */
    create<T extends WorkoutResultCreateArgs>(args: SelectSubset<T, WorkoutResultCreateArgs<ExtArgs>>): Prisma__WorkoutResultClient<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkoutResults.
     * @param {WorkoutResultCreateManyArgs} args - Arguments to create many WorkoutResults.
     * @example
     * // Create many WorkoutResults
     * const workoutResult = await prisma.workoutResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkoutResultCreateManyArgs>(args?: SelectSubset<T, WorkoutResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkoutResults and returns the data saved in the database.
     * @param {WorkoutResultCreateManyAndReturnArgs} args - Arguments to create many WorkoutResults.
     * @example
     * // Create many WorkoutResults
     * const workoutResult = await prisma.workoutResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkoutResults and only return the `id`
     * const workoutResultWithIdOnly = await prisma.workoutResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkoutResultCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkoutResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkoutResult.
     * @param {WorkoutResultDeleteArgs} args - Arguments to delete one WorkoutResult.
     * @example
     * // Delete one WorkoutResult
     * const WorkoutResult = await prisma.workoutResult.delete({
     *   where: {
     *     // ... filter to delete one WorkoutResult
     *   }
     * })
     * 
     */
    delete<T extends WorkoutResultDeleteArgs>(args: SelectSubset<T, WorkoutResultDeleteArgs<ExtArgs>>): Prisma__WorkoutResultClient<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkoutResult.
     * @param {WorkoutResultUpdateArgs} args - Arguments to update one WorkoutResult.
     * @example
     * // Update one WorkoutResult
     * const workoutResult = await prisma.workoutResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkoutResultUpdateArgs>(args: SelectSubset<T, WorkoutResultUpdateArgs<ExtArgs>>): Prisma__WorkoutResultClient<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkoutResults.
     * @param {WorkoutResultDeleteManyArgs} args - Arguments to filter WorkoutResults to delete.
     * @example
     * // Delete a few WorkoutResults
     * const { count } = await prisma.workoutResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkoutResultDeleteManyArgs>(args?: SelectSubset<T, WorkoutResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkoutResults
     * const workoutResult = await prisma.workoutResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkoutResultUpdateManyArgs>(args: SelectSubset<T, WorkoutResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutResults and returns the data updated in the database.
     * @param {WorkoutResultUpdateManyAndReturnArgs} args - Arguments to update many WorkoutResults.
     * @example
     * // Update many WorkoutResults
     * const workoutResult = await prisma.workoutResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkoutResults and only return the `id`
     * const workoutResultWithIdOnly = await prisma.workoutResult.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkoutResultUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkoutResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkoutResult.
     * @param {WorkoutResultUpsertArgs} args - Arguments to update or create a WorkoutResult.
     * @example
     * // Update or create a WorkoutResult
     * const workoutResult = await prisma.workoutResult.upsert({
     *   create: {
     *     // ... data to create a WorkoutResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkoutResult we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutResultUpsertArgs>(args: SelectSubset<T, WorkoutResultUpsertArgs<ExtArgs>>): Prisma__WorkoutResultClient<$Result.GetResult<Prisma.$WorkoutResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkoutResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutResultCountArgs} args - Arguments to filter WorkoutResults to count.
     * @example
     * // Count the number of WorkoutResults
     * const count = await prisma.workoutResult.count({
     *   where: {
     *     // ... the filter for the WorkoutResults we want to count
     *   }
     * })
    **/
    count<T extends WorkoutResultCountArgs>(
      args?: Subset<T, WorkoutResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkoutResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkoutResultAggregateArgs>(args: Subset<T, WorkoutResultAggregateArgs>): Prisma.PrismaPromise<GetWorkoutResultAggregateType<T>>

    /**
     * Group by WorkoutResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkoutResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutResultGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkoutResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkoutResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkoutResult model
   */
  readonly fields: WorkoutResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkoutResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    athlete<T extends AthleteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AthleteDefaultArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkoutResult model
   */
  interface WorkoutResultFieldRefs {
    readonly id: FieldRef<"WorkoutResult", 'String'>
    readonly athleteId: FieldRef<"WorkoutResult", 'Int'>
    readonly date: FieldRef<"WorkoutResult", 'DateTime'>
    readonly type: FieldRef<"WorkoutResult", 'String'>
    readonly details: FieldRef<"WorkoutResult", 'Json'>
    readonly notes: FieldRef<"WorkoutResult", 'String'>
    readonly createdAt: FieldRef<"WorkoutResult", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkoutResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkoutResult findUnique
   */
  export type WorkoutResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutResult to fetch.
     */
    where: WorkoutResultWhereUniqueInput
  }

  /**
   * WorkoutResult findUniqueOrThrow
   */
  export type WorkoutResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutResult to fetch.
     */
    where: WorkoutResultWhereUniqueInput
  }

  /**
   * WorkoutResult findFirst
   */
  export type WorkoutResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutResult to fetch.
     */
    where?: WorkoutResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutResults to fetch.
     */
    orderBy?: WorkoutResultOrderByWithRelationInput | WorkoutResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutResults.
     */
    cursor?: WorkoutResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutResults.
     */
    distinct?: WorkoutResultScalarFieldEnum | WorkoutResultScalarFieldEnum[]
  }

  /**
   * WorkoutResult findFirstOrThrow
   */
  export type WorkoutResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutResult to fetch.
     */
    where?: WorkoutResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutResults to fetch.
     */
    orderBy?: WorkoutResultOrderByWithRelationInput | WorkoutResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutResults.
     */
    cursor?: WorkoutResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutResults.
     */
    distinct?: WorkoutResultScalarFieldEnum | WorkoutResultScalarFieldEnum[]
  }

  /**
   * WorkoutResult findMany
   */
  export type WorkoutResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutResults to fetch.
     */
    where?: WorkoutResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutResults to fetch.
     */
    orderBy?: WorkoutResultOrderByWithRelationInput | WorkoutResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkoutResults.
     */
    cursor?: WorkoutResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutResults.
     */
    skip?: number
    distinct?: WorkoutResultScalarFieldEnum | WorkoutResultScalarFieldEnum[]
  }

  /**
   * WorkoutResult create
   */
  export type WorkoutResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkoutResult.
     */
    data: XOR<WorkoutResultCreateInput, WorkoutResultUncheckedCreateInput>
  }

  /**
   * WorkoutResult createMany
   */
  export type WorkoutResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkoutResults.
     */
    data: WorkoutResultCreateManyInput | WorkoutResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkoutResult createManyAndReturn
   */
  export type WorkoutResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * The data used to create many WorkoutResults.
     */
    data: WorkoutResultCreateManyInput | WorkoutResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkoutResult update
   */
  export type WorkoutResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkoutResult.
     */
    data: XOR<WorkoutResultUpdateInput, WorkoutResultUncheckedUpdateInput>
    /**
     * Choose, which WorkoutResult to update.
     */
    where: WorkoutResultWhereUniqueInput
  }

  /**
   * WorkoutResult updateMany
   */
  export type WorkoutResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkoutResults.
     */
    data: XOR<WorkoutResultUpdateManyMutationInput, WorkoutResultUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutResults to update
     */
    where?: WorkoutResultWhereInput
    /**
     * Limit how many WorkoutResults to update.
     */
    limit?: number
  }

  /**
   * WorkoutResult updateManyAndReturn
   */
  export type WorkoutResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * The data used to update WorkoutResults.
     */
    data: XOR<WorkoutResultUpdateManyMutationInput, WorkoutResultUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutResults to update
     */
    where?: WorkoutResultWhereInput
    /**
     * Limit how many WorkoutResults to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkoutResult upsert
   */
  export type WorkoutResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkoutResult to update in case it exists.
     */
    where: WorkoutResultWhereUniqueInput
    /**
     * In case the WorkoutResult found by the `where` argument doesn't exist, create a new WorkoutResult with this data.
     */
    create: XOR<WorkoutResultCreateInput, WorkoutResultUncheckedCreateInput>
    /**
     * In case the WorkoutResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutResultUpdateInput, WorkoutResultUncheckedUpdateInput>
  }

  /**
   * WorkoutResult delete
   */
  export type WorkoutResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
    /**
     * Filter which WorkoutResult to delete.
     */
    where: WorkoutResultWhereUniqueInput
  }

  /**
   * WorkoutResult deleteMany
   */
  export type WorkoutResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutResults to delete
     */
    where?: WorkoutResultWhereInput
    /**
     * Limit how many WorkoutResults to delete.
     */
    limit?: number
  }

  /**
   * WorkoutResult without action
   */
  export type WorkoutResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutResult
     */
    select?: WorkoutResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutResult
     */
    omit?: WorkoutResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutResultInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const AthleteScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    birthday: 'birthday',
    grade: 'grade',
    time1600m: 'time1600m',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    coachId: 'coachId'
  };

  export type AthleteScalarFieldEnum = (typeof AthleteScalarFieldEnum)[keyof typeof AthleteScalarFieldEnum]


  export const TrainingPlanScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    duration: 'duration',
    durationWeeks: 'durationWeeks',
    startDate: 'startDate',
    endDate: 'endDate',
    progress: 'progress',
    type: 'type',
    planType: 'planType',
    totalWorkouts: 'totalWorkouts',
    isCompleted: 'isCompleted',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrainingPlanScalarFieldEnum = (typeof TrainingPlanScalarFieldEnum)[keyof typeof TrainingPlanScalarFieldEnum]


  export const TrainingPlanAthleteScalarFieldEnum: {
    trainingPlanId: 'trainingPlanId',
    athleteId: 'athleteId',
    assignedAt: 'assignedAt'
  };

  export type TrainingPlanAthleteScalarFieldEnum = (typeof TrainingPlanAthleteScalarFieldEnum)[keyof typeof TrainingPlanAthleteScalarFieldEnum]


  export const PlanWeekScalarFieldEnum: {
    id: 'id',
    weekNumber: 'weekNumber',
    dateRange: 'dateRange',
    seasonPhase: 'seasonPhase',
    trainingPlanId: 'trainingPlanId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanWeekScalarFieldEnum = (typeof PlanWeekScalarFieldEnum)[keyof typeof PlanWeekScalarFieldEnum]


  export const WorkoutTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkoutTypeScalarFieldEnum = (typeof WorkoutTypeScalarFieldEnum)[keyof typeof WorkoutTypeScalarFieldEnum]


  export const PlanWorkoutScalarFieldEnum: {
    id: 'id',
    details: 'details',
    weekId: 'weekId',
    workoutTypeId: 'workoutTypeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanWorkoutScalarFieldEnum = (typeof PlanWorkoutScalarFieldEnum)[keyof typeof PlanWorkoutScalarFieldEnum]


  export const WorkoutResultScalarFieldEnum: {
    id: 'id',
    athleteId: 'athleteId',
    date: 'date',
    type: 'type',
    details: 'details',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkoutResultScalarFieldEnum = (typeof WorkoutResultScalarFieldEnum)[keyof typeof WorkoutResultScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    athletes?: AthleteListRelationFilter
    trainingPlans?: TrainingPlanListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    athletes?: AthleteOrderByRelationAggregateInput
    trainingPlans?: TrainingPlanOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    athletes?: AthleteListRelationFilter
    trainingPlans?: TrainingPlanListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type AthleteWhereInput = {
    AND?: AthleteWhereInput | AthleteWhereInput[]
    OR?: AthleteWhereInput[]
    NOT?: AthleteWhereInput | AthleteWhereInput[]
    id?: IntFilter<"Athlete"> | number
    firstName?: StringFilter<"Athlete"> | string
    lastName?: StringFilter<"Athlete"> | string
    birthday?: DateTimeFilter<"Athlete"> | Date | string
    grade?: IntFilter<"Athlete"> | number
    time1600m?: IntFilter<"Athlete"> | number
    createdAt?: DateTimeFilter<"Athlete"> | Date | string
    updatedAt?: DateTimeFilter<"Athlete"> | Date | string
    coachId?: StringFilter<"Athlete"> | string
    coach?: XOR<UserScalarRelationFilter, UserWhereInput>
    workoutResults?: WorkoutResultListRelationFilter
    trainingPlanAthletes?: TrainingPlanAthleteListRelationFilter
  }

  export type AthleteOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthday?: SortOrder
    grade?: SortOrder
    time1600m?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coachId?: SortOrder
    coach?: UserOrderByWithRelationInput
    workoutResults?: WorkoutResultOrderByRelationAggregateInput
    trainingPlanAthletes?: TrainingPlanAthleteOrderByRelationAggregateInput
  }

  export type AthleteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AthleteWhereInput | AthleteWhereInput[]
    OR?: AthleteWhereInput[]
    NOT?: AthleteWhereInput | AthleteWhereInput[]
    firstName?: StringFilter<"Athlete"> | string
    lastName?: StringFilter<"Athlete"> | string
    birthday?: DateTimeFilter<"Athlete"> | Date | string
    grade?: IntFilter<"Athlete"> | number
    time1600m?: IntFilter<"Athlete"> | number
    createdAt?: DateTimeFilter<"Athlete"> | Date | string
    updatedAt?: DateTimeFilter<"Athlete"> | Date | string
    coachId?: StringFilter<"Athlete"> | string
    coach?: XOR<UserScalarRelationFilter, UserWhereInput>
    workoutResults?: WorkoutResultListRelationFilter
    trainingPlanAthletes?: TrainingPlanAthleteListRelationFilter
  }, "id">

  export type AthleteOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthday?: SortOrder
    grade?: SortOrder
    time1600m?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coachId?: SortOrder
    _count?: AthleteCountOrderByAggregateInput
    _avg?: AthleteAvgOrderByAggregateInput
    _max?: AthleteMaxOrderByAggregateInput
    _min?: AthleteMinOrderByAggregateInput
    _sum?: AthleteSumOrderByAggregateInput
  }

  export type AthleteScalarWhereWithAggregatesInput = {
    AND?: AthleteScalarWhereWithAggregatesInput | AthleteScalarWhereWithAggregatesInput[]
    OR?: AthleteScalarWhereWithAggregatesInput[]
    NOT?: AthleteScalarWhereWithAggregatesInput | AthleteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Athlete"> | number
    firstName?: StringWithAggregatesFilter<"Athlete"> | string
    lastName?: StringWithAggregatesFilter<"Athlete"> | string
    birthday?: DateTimeWithAggregatesFilter<"Athlete"> | Date | string
    grade?: IntWithAggregatesFilter<"Athlete"> | number
    time1600m?: IntWithAggregatesFilter<"Athlete"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Athlete"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Athlete"> | Date | string
    coachId?: StringWithAggregatesFilter<"Athlete"> | string
  }

  export type TrainingPlanWhereInput = {
    AND?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    OR?: TrainingPlanWhereInput[]
    NOT?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    id?: StringFilter<"TrainingPlan"> | string
    title?: StringFilter<"TrainingPlan"> | string
    description?: StringNullableFilter<"TrainingPlan"> | string | null
    duration?: StringFilter<"TrainingPlan"> | string
    durationWeeks?: IntFilter<"TrainingPlan"> | number
    startDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    endDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    progress?: IntNullableFilter<"TrainingPlan"> | number | null
    type?: StringNullableFilter<"TrainingPlan"> | string | null
    planType?: StringNullableFilter<"TrainingPlan"> | string | null
    totalWorkouts?: IntNullableFilter<"TrainingPlan"> | number | null
    isCompleted?: BoolFilter<"TrainingPlan"> | boolean
    userId?: StringFilter<"TrainingPlan"> | string
    createdAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    weeks?: PlanWeekListRelationFilter
    athletes?: TrainingPlanAthleteListRelationFilter
  }

  export type TrainingPlanOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    duration?: SortOrder
    durationWeeks?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    progress?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    planType?: SortOrderInput | SortOrder
    totalWorkouts?: SortOrderInput | SortOrder
    isCompleted?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    weeks?: PlanWeekOrderByRelationAggregateInput
    athletes?: TrainingPlanAthleteOrderByRelationAggregateInput
  }

  export type TrainingPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    OR?: TrainingPlanWhereInput[]
    NOT?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    title?: StringFilter<"TrainingPlan"> | string
    description?: StringNullableFilter<"TrainingPlan"> | string | null
    duration?: StringFilter<"TrainingPlan"> | string
    durationWeeks?: IntFilter<"TrainingPlan"> | number
    startDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    endDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    progress?: IntNullableFilter<"TrainingPlan"> | number | null
    type?: StringNullableFilter<"TrainingPlan"> | string | null
    planType?: StringNullableFilter<"TrainingPlan"> | string | null
    totalWorkouts?: IntNullableFilter<"TrainingPlan"> | number | null
    isCompleted?: BoolFilter<"TrainingPlan"> | boolean
    userId?: StringFilter<"TrainingPlan"> | string
    createdAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    weeks?: PlanWeekListRelationFilter
    athletes?: TrainingPlanAthleteListRelationFilter
  }, "id">

  export type TrainingPlanOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    duration?: SortOrder
    durationWeeks?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    progress?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    planType?: SortOrderInput | SortOrder
    totalWorkouts?: SortOrderInput | SortOrder
    isCompleted?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrainingPlanCountOrderByAggregateInput
    _avg?: TrainingPlanAvgOrderByAggregateInput
    _max?: TrainingPlanMaxOrderByAggregateInput
    _min?: TrainingPlanMinOrderByAggregateInput
    _sum?: TrainingPlanSumOrderByAggregateInput
  }

  export type TrainingPlanScalarWhereWithAggregatesInput = {
    AND?: TrainingPlanScalarWhereWithAggregatesInput | TrainingPlanScalarWhereWithAggregatesInput[]
    OR?: TrainingPlanScalarWhereWithAggregatesInput[]
    NOT?: TrainingPlanScalarWhereWithAggregatesInput | TrainingPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingPlan"> | string
    title?: StringWithAggregatesFilter<"TrainingPlan"> | string
    description?: StringNullableWithAggregatesFilter<"TrainingPlan"> | string | null
    duration?: StringWithAggregatesFilter<"TrainingPlan"> | string
    durationWeeks?: IntWithAggregatesFilter<"TrainingPlan"> | number
    startDate?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
    progress?: IntNullableWithAggregatesFilter<"TrainingPlan"> | number | null
    type?: StringNullableWithAggregatesFilter<"TrainingPlan"> | string | null
    planType?: StringNullableWithAggregatesFilter<"TrainingPlan"> | string | null
    totalWorkouts?: IntNullableWithAggregatesFilter<"TrainingPlan"> | number | null
    isCompleted?: BoolWithAggregatesFilter<"TrainingPlan"> | boolean
    userId?: StringWithAggregatesFilter<"TrainingPlan"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
  }

  export type TrainingPlanAthleteWhereInput = {
    AND?: TrainingPlanAthleteWhereInput | TrainingPlanAthleteWhereInput[]
    OR?: TrainingPlanAthleteWhereInput[]
    NOT?: TrainingPlanAthleteWhereInput | TrainingPlanAthleteWhereInput[]
    trainingPlanId?: StringFilter<"TrainingPlanAthlete"> | string
    athleteId?: IntFilter<"TrainingPlanAthlete"> | number
    assignedAt?: DateTimeFilter<"TrainingPlanAthlete"> | Date | string
    trainingPlan?: XOR<TrainingPlanScalarRelationFilter, TrainingPlanWhereInput>
    athlete?: XOR<AthleteScalarRelationFilter, AthleteWhereInput>
  }

  export type TrainingPlanAthleteOrderByWithRelationInput = {
    trainingPlanId?: SortOrder
    athleteId?: SortOrder
    assignedAt?: SortOrder
    trainingPlan?: TrainingPlanOrderByWithRelationInput
    athlete?: AthleteOrderByWithRelationInput
  }

  export type TrainingPlanAthleteWhereUniqueInput = Prisma.AtLeast<{
    trainingPlanId_athleteId?: TrainingPlanAthleteTrainingPlanIdAthleteIdCompoundUniqueInput
    AND?: TrainingPlanAthleteWhereInput | TrainingPlanAthleteWhereInput[]
    OR?: TrainingPlanAthleteWhereInput[]
    NOT?: TrainingPlanAthleteWhereInput | TrainingPlanAthleteWhereInput[]
    trainingPlanId?: StringFilter<"TrainingPlanAthlete"> | string
    athleteId?: IntFilter<"TrainingPlanAthlete"> | number
    assignedAt?: DateTimeFilter<"TrainingPlanAthlete"> | Date | string
    trainingPlan?: XOR<TrainingPlanScalarRelationFilter, TrainingPlanWhereInput>
    athlete?: XOR<AthleteScalarRelationFilter, AthleteWhereInput>
  }, "trainingPlanId_athleteId">

  export type TrainingPlanAthleteOrderByWithAggregationInput = {
    trainingPlanId?: SortOrder
    athleteId?: SortOrder
    assignedAt?: SortOrder
    _count?: TrainingPlanAthleteCountOrderByAggregateInput
    _avg?: TrainingPlanAthleteAvgOrderByAggregateInput
    _max?: TrainingPlanAthleteMaxOrderByAggregateInput
    _min?: TrainingPlanAthleteMinOrderByAggregateInput
    _sum?: TrainingPlanAthleteSumOrderByAggregateInput
  }

  export type TrainingPlanAthleteScalarWhereWithAggregatesInput = {
    AND?: TrainingPlanAthleteScalarWhereWithAggregatesInput | TrainingPlanAthleteScalarWhereWithAggregatesInput[]
    OR?: TrainingPlanAthleteScalarWhereWithAggregatesInput[]
    NOT?: TrainingPlanAthleteScalarWhereWithAggregatesInput | TrainingPlanAthleteScalarWhereWithAggregatesInput[]
    trainingPlanId?: StringWithAggregatesFilter<"TrainingPlanAthlete"> | string
    athleteId?: IntWithAggregatesFilter<"TrainingPlanAthlete"> | number
    assignedAt?: DateTimeWithAggregatesFilter<"TrainingPlanAthlete"> | Date | string
  }

  export type PlanWeekWhereInput = {
    AND?: PlanWeekWhereInput | PlanWeekWhereInput[]
    OR?: PlanWeekWhereInput[]
    NOT?: PlanWeekWhereInput | PlanWeekWhereInput[]
    id?: StringFilter<"PlanWeek"> | string
    weekNumber?: IntFilter<"PlanWeek"> | number
    dateRange?: StringFilter<"PlanWeek"> | string
    seasonPhase?: StringNullableFilter<"PlanWeek"> | string | null
    trainingPlanId?: StringFilter<"PlanWeek"> | string
    createdAt?: DateTimeFilter<"PlanWeek"> | Date | string
    updatedAt?: DateTimeFilter<"PlanWeek"> | Date | string
    trainingPlan?: XOR<TrainingPlanScalarRelationFilter, TrainingPlanWhereInput>
    workouts?: PlanWorkoutListRelationFilter
  }

  export type PlanWeekOrderByWithRelationInput = {
    id?: SortOrder
    weekNumber?: SortOrder
    dateRange?: SortOrder
    seasonPhase?: SortOrderInput | SortOrder
    trainingPlanId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trainingPlan?: TrainingPlanOrderByWithRelationInput
    workouts?: PlanWorkoutOrderByRelationAggregateInput
  }

  export type PlanWeekWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    trainingPlanId_weekNumber?: PlanWeekTrainingPlanIdWeekNumberCompoundUniqueInput
    AND?: PlanWeekWhereInput | PlanWeekWhereInput[]
    OR?: PlanWeekWhereInput[]
    NOT?: PlanWeekWhereInput | PlanWeekWhereInput[]
    weekNumber?: IntFilter<"PlanWeek"> | number
    dateRange?: StringFilter<"PlanWeek"> | string
    seasonPhase?: StringNullableFilter<"PlanWeek"> | string | null
    trainingPlanId?: StringFilter<"PlanWeek"> | string
    createdAt?: DateTimeFilter<"PlanWeek"> | Date | string
    updatedAt?: DateTimeFilter<"PlanWeek"> | Date | string
    trainingPlan?: XOR<TrainingPlanScalarRelationFilter, TrainingPlanWhereInput>
    workouts?: PlanWorkoutListRelationFilter
  }, "id" | "trainingPlanId_weekNumber">

  export type PlanWeekOrderByWithAggregationInput = {
    id?: SortOrder
    weekNumber?: SortOrder
    dateRange?: SortOrder
    seasonPhase?: SortOrderInput | SortOrder
    trainingPlanId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanWeekCountOrderByAggregateInput
    _avg?: PlanWeekAvgOrderByAggregateInput
    _max?: PlanWeekMaxOrderByAggregateInput
    _min?: PlanWeekMinOrderByAggregateInput
    _sum?: PlanWeekSumOrderByAggregateInput
  }

  export type PlanWeekScalarWhereWithAggregatesInput = {
    AND?: PlanWeekScalarWhereWithAggregatesInput | PlanWeekScalarWhereWithAggregatesInput[]
    OR?: PlanWeekScalarWhereWithAggregatesInput[]
    NOT?: PlanWeekScalarWhereWithAggregatesInput | PlanWeekScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlanWeek"> | string
    weekNumber?: IntWithAggregatesFilter<"PlanWeek"> | number
    dateRange?: StringWithAggregatesFilter<"PlanWeek"> | string
    seasonPhase?: StringNullableWithAggregatesFilter<"PlanWeek"> | string | null
    trainingPlanId?: StringWithAggregatesFilter<"PlanWeek"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PlanWeek"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PlanWeek"> | Date | string
  }

  export type WorkoutTypeWhereInput = {
    AND?: WorkoutTypeWhereInput | WorkoutTypeWhereInput[]
    OR?: WorkoutTypeWhereInput[]
    NOT?: WorkoutTypeWhereInput | WorkoutTypeWhereInput[]
    id?: StringFilter<"WorkoutType"> | string
    name?: StringFilter<"WorkoutType"> | string
    color?: StringFilter<"WorkoutType"> | string
    createdAt?: DateTimeFilter<"WorkoutType"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutType"> | Date | string
    workouts?: PlanWorkoutListRelationFilter
  }

  export type WorkoutTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workouts?: PlanWorkoutOrderByRelationAggregateInput
  }

  export type WorkoutTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: WorkoutTypeWhereInput | WorkoutTypeWhereInput[]
    OR?: WorkoutTypeWhereInput[]
    NOT?: WorkoutTypeWhereInput | WorkoutTypeWhereInput[]
    color?: StringFilter<"WorkoutType"> | string
    createdAt?: DateTimeFilter<"WorkoutType"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutType"> | Date | string
    workouts?: PlanWorkoutListRelationFilter
  }, "id" | "name">

  export type WorkoutTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkoutTypeCountOrderByAggregateInput
    _max?: WorkoutTypeMaxOrderByAggregateInput
    _min?: WorkoutTypeMinOrderByAggregateInput
  }

  export type WorkoutTypeScalarWhereWithAggregatesInput = {
    AND?: WorkoutTypeScalarWhereWithAggregatesInput | WorkoutTypeScalarWhereWithAggregatesInput[]
    OR?: WorkoutTypeScalarWhereWithAggregatesInput[]
    NOT?: WorkoutTypeScalarWhereWithAggregatesInput | WorkoutTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkoutType"> | string
    name?: StringWithAggregatesFilter<"WorkoutType"> | string
    color?: StringWithAggregatesFilter<"WorkoutType"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WorkoutType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkoutType"> | Date | string
  }

  export type PlanWorkoutWhereInput = {
    AND?: PlanWorkoutWhereInput | PlanWorkoutWhereInput[]
    OR?: PlanWorkoutWhereInput[]
    NOT?: PlanWorkoutWhereInput | PlanWorkoutWhereInput[]
    id?: StringFilter<"PlanWorkout"> | string
    details?: StringNullableFilter<"PlanWorkout"> | string | null
    weekId?: StringFilter<"PlanWorkout"> | string
    workoutTypeId?: StringFilter<"PlanWorkout"> | string
    createdAt?: DateTimeFilter<"PlanWorkout"> | Date | string
    updatedAt?: DateTimeFilter<"PlanWorkout"> | Date | string
    week?: XOR<PlanWeekScalarRelationFilter, PlanWeekWhereInput>
    workoutType?: XOR<WorkoutTypeScalarRelationFilter, WorkoutTypeWhereInput>
  }

  export type PlanWorkoutOrderByWithRelationInput = {
    id?: SortOrder
    details?: SortOrderInput | SortOrder
    weekId?: SortOrder
    workoutTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    week?: PlanWeekOrderByWithRelationInput
    workoutType?: WorkoutTypeOrderByWithRelationInput
  }

  export type PlanWorkoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    weekId_workoutTypeId?: PlanWorkoutWeekIdWorkoutTypeIdCompoundUniqueInput
    AND?: PlanWorkoutWhereInput | PlanWorkoutWhereInput[]
    OR?: PlanWorkoutWhereInput[]
    NOT?: PlanWorkoutWhereInput | PlanWorkoutWhereInput[]
    details?: StringNullableFilter<"PlanWorkout"> | string | null
    weekId?: StringFilter<"PlanWorkout"> | string
    workoutTypeId?: StringFilter<"PlanWorkout"> | string
    createdAt?: DateTimeFilter<"PlanWorkout"> | Date | string
    updatedAt?: DateTimeFilter<"PlanWorkout"> | Date | string
    week?: XOR<PlanWeekScalarRelationFilter, PlanWeekWhereInput>
    workoutType?: XOR<WorkoutTypeScalarRelationFilter, WorkoutTypeWhereInput>
  }, "id" | "weekId_workoutTypeId">

  export type PlanWorkoutOrderByWithAggregationInput = {
    id?: SortOrder
    details?: SortOrderInput | SortOrder
    weekId?: SortOrder
    workoutTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanWorkoutCountOrderByAggregateInput
    _max?: PlanWorkoutMaxOrderByAggregateInput
    _min?: PlanWorkoutMinOrderByAggregateInput
  }

  export type PlanWorkoutScalarWhereWithAggregatesInput = {
    AND?: PlanWorkoutScalarWhereWithAggregatesInput | PlanWorkoutScalarWhereWithAggregatesInput[]
    OR?: PlanWorkoutScalarWhereWithAggregatesInput[]
    NOT?: PlanWorkoutScalarWhereWithAggregatesInput | PlanWorkoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlanWorkout"> | string
    details?: StringNullableWithAggregatesFilter<"PlanWorkout"> | string | null
    weekId?: StringWithAggregatesFilter<"PlanWorkout"> | string
    workoutTypeId?: StringWithAggregatesFilter<"PlanWorkout"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PlanWorkout"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PlanWorkout"> | Date | string
  }

  export type WorkoutResultWhereInput = {
    AND?: WorkoutResultWhereInput | WorkoutResultWhereInput[]
    OR?: WorkoutResultWhereInput[]
    NOT?: WorkoutResultWhereInput | WorkoutResultWhereInput[]
    id?: StringFilter<"WorkoutResult"> | string
    athleteId?: IntFilter<"WorkoutResult"> | number
    date?: DateTimeFilter<"WorkoutResult"> | Date | string
    type?: StringFilter<"WorkoutResult"> | string
    details?: JsonFilter<"WorkoutResult">
    notes?: StringNullableFilter<"WorkoutResult"> | string | null
    createdAt?: DateTimeFilter<"WorkoutResult"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutResult"> | Date | string
    athlete?: XOR<AthleteScalarRelationFilter, AthleteWhereInput>
  }

  export type WorkoutResultOrderByWithRelationInput = {
    id?: SortOrder
    athleteId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    details?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    athlete?: AthleteOrderByWithRelationInput
  }

  export type WorkoutResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkoutResultWhereInput | WorkoutResultWhereInput[]
    OR?: WorkoutResultWhereInput[]
    NOT?: WorkoutResultWhereInput | WorkoutResultWhereInput[]
    athleteId?: IntFilter<"WorkoutResult"> | number
    date?: DateTimeFilter<"WorkoutResult"> | Date | string
    type?: StringFilter<"WorkoutResult"> | string
    details?: JsonFilter<"WorkoutResult">
    notes?: StringNullableFilter<"WorkoutResult"> | string | null
    createdAt?: DateTimeFilter<"WorkoutResult"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutResult"> | Date | string
    athlete?: XOR<AthleteScalarRelationFilter, AthleteWhereInput>
  }, "id">

  export type WorkoutResultOrderByWithAggregationInput = {
    id?: SortOrder
    athleteId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    details?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkoutResultCountOrderByAggregateInput
    _avg?: WorkoutResultAvgOrderByAggregateInput
    _max?: WorkoutResultMaxOrderByAggregateInput
    _min?: WorkoutResultMinOrderByAggregateInput
    _sum?: WorkoutResultSumOrderByAggregateInput
  }

  export type WorkoutResultScalarWhereWithAggregatesInput = {
    AND?: WorkoutResultScalarWhereWithAggregatesInput | WorkoutResultScalarWhereWithAggregatesInput[]
    OR?: WorkoutResultScalarWhereWithAggregatesInput[]
    NOT?: WorkoutResultScalarWhereWithAggregatesInput | WorkoutResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkoutResult"> | string
    athleteId?: IntWithAggregatesFilter<"WorkoutResult"> | number
    date?: DateTimeWithAggregatesFilter<"WorkoutResult"> | Date | string
    type?: StringWithAggregatesFilter<"WorkoutResult"> | string
    details?: JsonWithAggregatesFilter<"WorkoutResult">
    notes?: StringNullableWithAggregatesFilter<"WorkoutResult"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WorkoutResult"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkoutResult"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    athletes?: AthleteCreateNestedManyWithoutCoachInput
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    athletes?: AthleteUncheckedCreateNestedManyWithoutCoachInput
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    athletes?: AthleteUpdateManyWithoutCoachNestedInput
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    athletes?: AthleteUncheckedUpdateManyWithoutCoachNestedInput
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteCreateInput = {
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
    coach: UserCreateNestedOneWithoutAthletesInput
    workoutResults?: WorkoutResultCreateNestedManyWithoutAthleteInput
    trainingPlanAthletes?: TrainingPlanAthleteCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
    coachId: string
    workoutResults?: WorkoutResultUncheckedCreateNestedManyWithoutAthleteInput
    trainingPlanAthletes?: TrainingPlanAthleteUncheckedCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coach?: UserUpdateOneRequiredWithoutAthletesNestedInput
    workoutResults?: WorkoutResultUpdateManyWithoutAthleteNestedInput
    trainingPlanAthletes?: TrainingPlanAthleteUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachId?: StringFieldUpdateOperationsInput | string
    workoutResults?: WorkoutResultUncheckedUpdateManyWithoutAthleteNestedInput
    trainingPlanAthletes?: TrainingPlanAthleteUncheckedUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteCreateManyInput = {
    id?: number
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
    coachId: string
  }

  export type AthleteUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachId?: StringFieldUpdateOperationsInput | string
  }

  export type TrainingPlanCreateInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTrainingPlansInput
    weeks?: PlanWeekCreateNestedManyWithoutTrainingPlanInput
    athletes?: TrainingPlanAthleteCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weeks?: PlanWeekUncheckedCreateNestedManyWithoutTrainingPlanInput
    athletes?: TrainingPlanAthleteUncheckedCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainingPlansNestedInput
    weeks?: PlanWeekUpdateManyWithoutTrainingPlanNestedInput
    athletes?: TrainingPlanAthleteUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weeks?: PlanWeekUncheckedUpdateManyWithoutTrainingPlanNestedInput
    athletes?: TrainingPlanAthleteUncheckedUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanAthleteCreateInput = {
    assignedAt?: Date | string
    trainingPlan: TrainingPlanCreateNestedOneWithoutAthletesInput
    athlete: AthleteCreateNestedOneWithoutTrainingPlanAthletesInput
  }

  export type TrainingPlanAthleteUncheckedCreateInput = {
    trainingPlanId: string
    athleteId: number
    assignedAt?: Date | string
  }

  export type TrainingPlanAthleteUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlan?: TrainingPlanUpdateOneRequiredWithoutAthletesNestedInput
    athlete?: AthleteUpdateOneRequiredWithoutTrainingPlanAthletesNestedInput
  }

  export type TrainingPlanAthleteUncheckedUpdateInput = {
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    athleteId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanAthleteCreateManyInput = {
    trainingPlanId: string
    athleteId: number
    assignedAt?: Date | string
  }

  export type TrainingPlanAthleteUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanAthleteUncheckedUpdateManyInput = {
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    athleteId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWeekCreateInput = {
    id?: string
    weekNumber: number
    dateRange: string
    seasonPhase?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingPlan: TrainingPlanCreateNestedOneWithoutWeeksInput
    workouts?: PlanWorkoutCreateNestedManyWithoutWeekInput
  }

  export type PlanWeekUncheckedCreateInput = {
    id?: string
    weekNumber: number
    dateRange: string
    seasonPhase?: string | null
    trainingPlanId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    workouts?: PlanWorkoutUncheckedCreateNestedManyWithoutWeekInput
  }

  export type PlanWeekUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    dateRange?: StringFieldUpdateOperationsInput | string
    seasonPhase?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlan?: TrainingPlanUpdateOneRequiredWithoutWeeksNestedInput
    workouts?: PlanWorkoutUpdateManyWithoutWeekNestedInput
  }

  export type PlanWeekUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    dateRange?: StringFieldUpdateOperationsInput | string
    seasonPhase?: NullableStringFieldUpdateOperationsInput | string | null
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workouts?: PlanWorkoutUncheckedUpdateManyWithoutWeekNestedInput
  }

  export type PlanWeekCreateManyInput = {
    id?: string
    weekNumber: number
    dateRange: string
    seasonPhase?: string | null
    trainingPlanId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanWeekUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    dateRange?: StringFieldUpdateOperationsInput | string
    seasonPhase?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWeekUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    dateRange?: StringFieldUpdateOperationsInput | string
    seasonPhase?: NullableStringFieldUpdateOperationsInput | string | null
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutTypeCreateInput = {
    id?: string
    name: string
    color: string
    createdAt?: Date | string
    updatedAt?: Date | string
    workouts?: PlanWorkoutCreateNestedManyWithoutWorkoutTypeInput
  }

  export type WorkoutTypeUncheckedCreateInput = {
    id?: string
    name: string
    color: string
    createdAt?: Date | string
    updatedAt?: Date | string
    workouts?: PlanWorkoutUncheckedCreateNestedManyWithoutWorkoutTypeInput
  }

  export type WorkoutTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workouts?: PlanWorkoutUpdateManyWithoutWorkoutTypeNestedInput
  }

  export type WorkoutTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workouts?: PlanWorkoutUncheckedUpdateManyWithoutWorkoutTypeNestedInput
  }

  export type WorkoutTypeCreateManyInput = {
    id?: string
    name: string
    color: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWorkoutCreateInput = {
    id?: string
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    week: PlanWeekCreateNestedOneWithoutWorkoutsInput
    workoutType: WorkoutTypeCreateNestedOneWithoutWorkoutsInput
  }

  export type PlanWorkoutUncheckedCreateInput = {
    id?: string
    details?: string | null
    weekId: string
    workoutTypeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanWorkoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    week?: PlanWeekUpdateOneRequiredWithoutWorkoutsNestedInput
    workoutType?: WorkoutTypeUpdateOneRequiredWithoutWorkoutsNestedInput
  }

  export type PlanWorkoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    weekId?: StringFieldUpdateOperationsInput | string
    workoutTypeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWorkoutCreateManyInput = {
    id?: string
    details?: string | null
    weekId: string
    workoutTypeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanWorkoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWorkoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    weekId?: StringFieldUpdateOperationsInput | string
    workoutTypeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutResultCreateInput = {
    id?: string
    date: Date | string
    type: string
    details: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    athlete: AthleteCreateNestedOneWithoutWorkoutResultsInput
  }

  export type WorkoutResultUncheckedCreateInput = {
    id?: string
    athleteId: number
    date: Date | string
    type: string
    details: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    athlete?: AthleteUpdateOneRequiredWithoutWorkoutResultsNestedInput
  }

  export type WorkoutResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutResultCreateManyInput = {
    id?: string
    athleteId: number
    date: Date | string
    type: string
    details: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AthleteListRelationFilter = {
    every?: AthleteWhereInput
    some?: AthleteWhereInput
    none?: AthleteWhereInput
  }

  export type TrainingPlanListRelationFilter = {
    every?: TrainingPlanWhereInput
    some?: TrainingPlanWhereInput
    none?: TrainingPlanWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AthleteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type WorkoutResultListRelationFilter = {
    every?: WorkoutResultWhereInput
    some?: WorkoutResultWhereInput
    none?: WorkoutResultWhereInput
  }

  export type TrainingPlanAthleteListRelationFilter = {
    every?: TrainingPlanAthleteWhereInput
    some?: TrainingPlanAthleteWhereInput
    none?: TrainingPlanAthleteWhereInput
  }

  export type WorkoutResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingPlanAthleteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AthleteCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthday?: SortOrder
    grade?: SortOrder
    time1600m?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coachId?: SortOrder
  }

  export type AthleteAvgOrderByAggregateInput = {
    id?: SortOrder
    grade?: SortOrder
    time1600m?: SortOrder
  }

  export type AthleteMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthday?: SortOrder
    grade?: SortOrder
    time1600m?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coachId?: SortOrder
  }

  export type AthleteMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthday?: SortOrder
    grade?: SortOrder
    time1600m?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coachId?: SortOrder
  }

  export type AthleteSumOrderByAggregateInput = {
    id?: SortOrder
    grade?: SortOrder
    time1600m?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PlanWeekListRelationFilter = {
    every?: PlanWeekWhereInput
    some?: PlanWeekWhereInput
    none?: PlanWeekWhereInput
  }

  export type PlanWeekOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingPlanCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    durationWeeks?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    progress?: SortOrder
    type?: SortOrder
    planType?: SortOrder
    totalWorkouts?: SortOrder
    isCompleted?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingPlanAvgOrderByAggregateInput = {
    durationWeeks?: SortOrder
    progress?: SortOrder
    totalWorkouts?: SortOrder
  }

  export type TrainingPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    durationWeeks?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    progress?: SortOrder
    type?: SortOrder
    planType?: SortOrder
    totalWorkouts?: SortOrder
    isCompleted?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingPlanMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    durationWeeks?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    progress?: SortOrder
    type?: SortOrder
    planType?: SortOrder
    totalWorkouts?: SortOrder
    isCompleted?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingPlanSumOrderByAggregateInput = {
    durationWeeks?: SortOrder
    progress?: SortOrder
    totalWorkouts?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TrainingPlanScalarRelationFilter = {
    is?: TrainingPlanWhereInput
    isNot?: TrainingPlanWhereInput
  }

  export type AthleteScalarRelationFilter = {
    is?: AthleteWhereInput
    isNot?: AthleteWhereInput
  }

  export type TrainingPlanAthleteTrainingPlanIdAthleteIdCompoundUniqueInput = {
    trainingPlanId: string
    athleteId: number
  }

  export type TrainingPlanAthleteCountOrderByAggregateInput = {
    trainingPlanId?: SortOrder
    athleteId?: SortOrder
    assignedAt?: SortOrder
  }

  export type TrainingPlanAthleteAvgOrderByAggregateInput = {
    athleteId?: SortOrder
  }

  export type TrainingPlanAthleteMaxOrderByAggregateInput = {
    trainingPlanId?: SortOrder
    athleteId?: SortOrder
    assignedAt?: SortOrder
  }

  export type TrainingPlanAthleteMinOrderByAggregateInput = {
    trainingPlanId?: SortOrder
    athleteId?: SortOrder
    assignedAt?: SortOrder
  }

  export type TrainingPlanAthleteSumOrderByAggregateInput = {
    athleteId?: SortOrder
  }

  export type PlanWorkoutListRelationFilter = {
    every?: PlanWorkoutWhereInput
    some?: PlanWorkoutWhereInput
    none?: PlanWorkoutWhereInput
  }

  export type PlanWorkoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanWeekTrainingPlanIdWeekNumberCompoundUniqueInput = {
    trainingPlanId: string
    weekNumber: number
  }

  export type PlanWeekCountOrderByAggregateInput = {
    id?: SortOrder
    weekNumber?: SortOrder
    dateRange?: SortOrder
    seasonPhase?: SortOrder
    trainingPlanId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanWeekAvgOrderByAggregateInput = {
    weekNumber?: SortOrder
  }

  export type PlanWeekMaxOrderByAggregateInput = {
    id?: SortOrder
    weekNumber?: SortOrder
    dateRange?: SortOrder
    seasonPhase?: SortOrder
    trainingPlanId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanWeekMinOrderByAggregateInput = {
    id?: SortOrder
    weekNumber?: SortOrder
    dateRange?: SortOrder
    seasonPhase?: SortOrder
    trainingPlanId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanWeekSumOrderByAggregateInput = {
    weekNumber?: SortOrder
  }

  export type WorkoutTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanWeekScalarRelationFilter = {
    is?: PlanWeekWhereInput
    isNot?: PlanWeekWhereInput
  }

  export type WorkoutTypeScalarRelationFilter = {
    is?: WorkoutTypeWhereInput
    isNot?: WorkoutTypeWhereInput
  }

  export type PlanWorkoutWeekIdWorkoutTypeIdCompoundUniqueInput = {
    weekId: string
    workoutTypeId: string
  }

  export type PlanWorkoutCountOrderByAggregateInput = {
    id?: SortOrder
    details?: SortOrder
    weekId?: SortOrder
    workoutTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanWorkoutMaxOrderByAggregateInput = {
    id?: SortOrder
    details?: SortOrder
    weekId?: SortOrder
    workoutTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanWorkoutMinOrderByAggregateInput = {
    id?: SortOrder
    details?: SortOrder
    weekId?: SortOrder
    workoutTypeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WorkoutResultCountOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    details?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutResultAvgOrderByAggregateInput = {
    athleteId?: SortOrder
  }

  export type WorkoutResultMaxOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutResultMinOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutResultSumOrderByAggregateInput = {
    athleteId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AthleteCreateNestedManyWithoutCoachInput = {
    create?: XOR<AthleteCreateWithoutCoachInput, AthleteUncheckedCreateWithoutCoachInput> | AthleteCreateWithoutCoachInput[] | AthleteUncheckedCreateWithoutCoachInput[]
    connectOrCreate?: AthleteCreateOrConnectWithoutCoachInput | AthleteCreateOrConnectWithoutCoachInput[]
    createMany?: AthleteCreateManyCoachInputEnvelope
    connect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
  }

  export type TrainingPlanCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AthleteUncheckedCreateNestedManyWithoutCoachInput = {
    create?: XOR<AthleteCreateWithoutCoachInput, AthleteUncheckedCreateWithoutCoachInput> | AthleteCreateWithoutCoachInput[] | AthleteUncheckedCreateWithoutCoachInput[]
    connectOrCreate?: AthleteCreateOrConnectWithoutCoachInput | AthleteCreateOrConnectWithoutCoachInput[]
    createMany?: AthleteCreateManyCoachInputEnvelope
    connect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
  }

  export type TrainingPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AthleteUpdateManyWithoutCoachNestedInput = {
    create?: XOR<AthleteCreateWithoutCoachInput, AthleteUncheckedCreateWithoutCoachInput> | AthleteCreateWithoutCoachInput[] | AthleteUncheckedCreateWithoutCoachInput[]
    connectOrCreate?: AthleteCreateOrConnectWithoutCoachInput | AthleteCreateOrConnectWithoutCoachInput[]
    upsert?: AthleteUpsertWithWhereUniqueWithoutCoachInput | AthleteUpsertWithWhereUniqueWithoutCoachInput[]
    createMany?: AthleteCreateManyCoachInputEnvelope
    set?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    disconnect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    delete?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    connect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    update?: AthleteUpdateWithWhereUniqueWithoutCoachInput | AthleteUpdateWithWhereUniqueWithoutCoachInput[]
    updateMany?: AthleteUpdateManyWithWhereWithoutCoachInput | AthleteUpdateManyWithWhereWithoutCoachInput[]
    deleteMany?: AthleteScalarWhereInput | AthleteScalarWhereInput[]
  }

  export type TrainingPlanUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    upsert?: TrainingPlanUpsertWithWhereUniqueWithoutUserInput | TrainingPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    set?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    disconnect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    delete?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    update?: TrainingPlanUpdateWithWhereUniqueWithoutUserInput | TrainingPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingPlanUpdateManyWithWhereWithoutUserInput | TrainingPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AthleteUncheckedUpdateManyWithoutCoachNestedInput = {
    create?: XOR<AthleteCreateWithoutCoachInput, AthleteUncheckedCreateWithoutCoachInput> | AthleteCreateWithoutCoachInput[] | AthleteUncheckedCreateWithoutCoachInput[]
    connectOrCreate?: AthleteCreateOrConnectWithoutCoachInput | AthleteCreateOrConnectWithoutCoachInput[]
    upsert?: AthleteUpsertWithWhereUniqueWithoutCoachInput | AthleteUpsertWithWhereUniqueWithoutCoachInput[]
    createMany?: AthleteCreateManyCoachInputEnvelope
    set?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    disconnect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    delete?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    connect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    update?: AthleteUpdateWithWhereUniqueWithoutCoachInput | AthleteUpdateWithWhereUniqueWithoutCoachInput[]
    updateMany?: AthleteUpdateManyWithWhereWithoutCoachInput | AthleteUpdateManyWithWhereWithoutCoachInput[]
    deleteMany?: AthleteScalarWhereInput | AthleteScalarWhereInput[]
  }

  export type TrainingPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    upsert?: TrainingPlanUpsertWithWhereUniqueWithoutUserInput | TrainingPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    set?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    disconnect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    delete?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    update?: TrainingPlanUpdateWithWhereUniqueWithoutUserInput | TrainingPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingPlanUpdateManyWithWhereWithoutUserInput | TrainingPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAthletesInput = {
    create?: XOR<UserCreateWithoutAthletesInput, UserUncheckedCreateWithoutAthletesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAthletesInput
    connect?: UserWhereUniqueInput
  }

  export type WorkoutResultCreateNestedManyWithoutAthleteInput = {
    create?: XOR<WorkoutResultCreateWithoutAthleteInput, WorkoutResultUncheckedCreateWithoutAthleteInput> | WorkoutResultCreateWithoutAthleteInput[] | WorkoutResultUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: WorkoutResultCreateOrConnectWithoutAthleteInput | WorkoutResultCreateOrConnectWithoutAthleteInput[]
    createMany?: WorkoutResultCreateManyAthleteInputEnvelope
    connect?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
  }

  export type TrainingPlanAthleteCreateNestedManyWithoutAthleteInput = {
    create?: XOR<TrainingPlanAthleteCreateWithoutAthleteInput, TrainingPlanAthleteUncheckedCreateWithoutAthleteInput> | TrainingPlanAthleteCreateWithoutAthleteInput[] | TrainingPlanAthleteUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: TrainingPlanAthleteCreateOrConnectWithoutAthleteInput | TrainingPlanAthleteCreateOrConnectWithoutAthleteInput[]
    createMany?: TrainingPlanAthleteCreateManyAthleteInputEnvelope
    connect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
  }

  export type WorkoutResultUncheckedCreateNestedManyWithoutAthleteInput = {
    create?: XOR<WorkoutResultCreateWithoutAthleteInput, WorkoutResultUncheckedCreateWithoutAthleteInput> | WorkoutResultCreateWithoutAthleteInput[] | WorkoutResultUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: WorkoutResultCreateOrConnectWithoutAthleteInput | WorkoutResultCreateOrConnectWithoutAthleteInput[]
    createMany?: WorkoutResultCreateManyAthleteInputEnvelope
    connect?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
  }

  export type TrainingPlanAthleteUncheckedCreateNestedManyWithoutAthleteInput = {
    create?: XOR<TrainingPlanAthleteCreateWithoutAthleteInput, TrainingPlanAthleteUncheckedCreateWithoutAthleteInput> | TrainingPlanAthleteCreateWithoutAthleteInput[] | TrainingPlanAthleteUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: TrainingPlanAthleteCreateOrConnectWithoutAthleteInput | TrainingPlanAthleteCreateOrConnectWithoutAthleteInput[]
    createMany?: TrainingPlanAthleteCreateManyAthleteInputEnvelope
    connect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAthletesNestedInput = {
    create?: XOR<UserCreateWithoutAthletesInput, UserUncheckedCreateWithoutAthletesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAthletesInput
    upsert?: UserUpsertWithoutAthletesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAthletesInput, UserUpdateWithoutAthletesInput>, UserUncheckedUpdateWithoutAthletesInput>
  }

  export type WorkoutResultUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<WorkoutResultCreateWithoutAthleteInput, WorkoutResultUncheckedCreateWithoutAthleteInput> | WorkoutResultCreateWithoutAthleteInput[] | WorkoutResultUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: WorkoutResultCreateOrConnectWithoutAthleteInput | WorkoutResultCreateOrConnectWithoutAthleteInput[]
    upsert?: WorkoutResultUpsertWithWhereUniqueWithoutAthleteInput | WorkoutResultUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: WorkoutResultCreateManyAthleteInputEnvelope
    set?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
    disconnect?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
    delete?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
    connect?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
    update?: WorkoutResultUpdateWithWhereUniqueWithoutAthleteInput | WorkoutResultUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: WorkoutResultUpdateManyWithWhereWithoutAthleteInput | WorkoutResultUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: WorkoutResultScalarWhereInput | WorkoutResultScalarWhereInput[]
  }

  export type TrainingPlanAthleteUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<TrainingPlanAthleteCreateWithoutAthleteInput, TrainingPlanAthleteUncheckedCreateWithoutAthleteInput> | TrainingPlanAthleteCreateWithoutAthleteInput[] | TrainingPlanAthleteUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: TrainingPlanAthleteCreateOrConnectWithoutAthleteInput | TrainingPlanAthleteCreateOrConnectWithoutAthleteInput[]
    upsert?: TrainingPlanAthleteUpsertWithWhereUniqueWithoutAthleteInput | TrainingPlanAthleteUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: TrainingPlanAthleteCreateManyAthleteInputEnvelope
    set?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    disconnect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    delete?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    connect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    update?: TrainingPlanAthleteUpdateWithWhereUniqueWithoutAthleteInput | TrainingPlanAthleteUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: TrainingPlanAthleteUpdateManyWithWhereWithoutAthleteInput | TrainingPlanAthleteUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: TrainingPlanAthleteScalarWhereInput | TrainingPlanAthleteScalarWhereInput[]
  }

  export type WorkoutResultUncheckedUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<WorkoutResultCreateWithoutAthleteInput, WorkoutResultUncheckedCreateWithoutAthleteInput> | WorkoutResultCreateWithoutAthleteInput[] | WorkoutResultUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: WorkoutResultCreateOrConnectWithoutAthleteInput | WorkoutResultCreateOrConnectWithoutAthleteInput[]
    upsert?: WorkoutResultUpsertWithWhereUniqueWithoutAthleteInput | WorkoutResultUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: WorkoutResultCreateManyAthleteInputEnvelope
    set?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
    disconnect?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
    delete?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
    connect?: WorkoutResultWhereUniqueInput | WorkoutResultWhereUniqueInput[]
    update?: WorkoutResultUpdateWithWhereUniqueWithoutAthleteInput | WorkoutResultUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: WorkoutResultUpdateManyWithWhereWithoutAthleteInput | WorkoutResultUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: WorkoutResultScalarWhereInput | WorkoutResultScalarWhereInput[]
  }

  export type TrainingPlanAthleteUncheckedUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<TrainingPlanAthleteCreateWithoutAthleteInput, TrainingPlanAthleteUncheckedCreateWithoutAthleteInput> | TrainingPlanAthleteCreateWithoutAthleteInput[] | TrainingPlanAthleteUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: TrainingPlanAthleteCreateOrConnectWithoutAthleteInput | TrainingPlanAthleteCreateOrConnectWithoutAthleteInput[]
    upsert?: TrainingPlanAthleteUpsertWithWhereUniqueWithoutAthleteInput | TrainingPlanAthleteUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: TrainingPlanAthleteCreateManyAthleteInputEnvelope
    set?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    disconnect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    delete?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    connect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    update?: TrainingPlanAthleteUpdateWithWhereUniqueWithoutAthleteInput | TrainingPlanAthleteUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: TrainingPlanAthleteUpdateManyWithWhereWithoutAthleteInput | TrainingPlanAthleteUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: TrainingPlanAthleteScalarWhereInput | TrainingPlanAthleteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTrainingPlansInput = {
    create?: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingPlansInput
    connect?: UserWhereUniqueInput
  }

  export type PlanWeekCreateNestedManyWithoutTrainingPlanInput = {
    create?: XOR<PlanWeekCreateWithoutTrainingPlanInput, PlanWeekUncheckedCreateWithoutTrainingPlanInput> | PlanWeekCreateWithoutTrainingPlanInput[] | PlanWeekUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: PlanWeekCreateOrConnectWithoutTrainingPlanInput | PlanWeekCreateOrConnectWithoutTrainingPlanInput[]
    createMany?: PlanWeekCreateManyTrainingPlanInputEnvelope
    connect?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
  }

  export type TrainingPlanAthleteCreateNestedManyWithoutTrainingPlanInput = {
    create?: XOR<TrainingPlanAthleteCreateWithoutTrainingPlanInput, TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput> | TrainingPlanAthleteCreateWithoutTrainingPlanInput[] | TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingPlanAthleteCreateOrConnectWithoutTrainingPlanInput | TrainingPlanAthleteCreateOrConnectWithoutTrainingPlanInput[]
    createMany?: TrainingPlanAthleteCreateManyTrainingPlanInputEnvelope
    connect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
  }

  export type PlanWeekUncheckedCreateNestedManyWithoutTrainingPlanInput = {
    create?: XOR<PlanWeekCreateWithoutTrainingPlanInput, PlanWeekUncheckedCreateWithoutTrainingPlanInput> | PlanWeekCreateWithoutTrainingPlanInput[] | PlanWeekUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: PlanWeekCreateOrConnectWithoutTrainingPlanInput | PlanWeekCreateOrConnectWithoutTrainingPlanInput[]
    createMany?: PlanWeekCreateManyTrainingPlanInputEnvelope
    connect?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
  }

  export type TrainingPlanAthleteUncheckedCreateNestedManyWithoutTrainingPlanInput = {
    create?: XOR<TrainingPlanAthleteCreateWithoutTrainingPlanInput, TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput> | TrainingPlanAthleteCreateWithoutTrainingPlanInput[] | TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingPlanAthleteCreateOrConnectWithoutTrainingPlanInput | TrainingPlanAthleteCreateOrConnectWithoutTrainingPlanInput[]
    createMany?: TrainingPlanAthleteCreateManyTrainingPlanInputEnvelope
    connect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutTrainingPlansNestedInput = {
    create?: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingPlansInput
    upsert?: UserUpsertWithoutTrainingPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTrainingPlansInput, UserUpdateWithoutTrainingPlansInput>, UserUncheckedUpdateWithoutTrainingPlansInput>
  }

  export type PlanWeekUpdateManyWithoutTrainingPlanNestedInput = {
    create?: XOR<PlanWeekCreateWithoutTrainingPlanInput, PlanWeekUncheckedCreateWithoutTrainingPlanInput> | PlanWeekCreateWithoutTrainingPlanInput[] | PlanWeekUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: PlanWeekCreateOrConnectWithoutTrainingPlanInput | PlanWeekCreateOrConnectWithoutTrainingPlanInput[]
    upsert?: PlanWeekUpsertWithWhereUniqueWithoutTrainingPlanInput | PlanWeekUpsertWithWhereUniqueWithoutTrainingPlanInput[]
    createMany?: PlanWeekCreateManyTrainingPlanInputEnvelope
    set?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
    disconnect?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
    delete?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
    connect?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
    update?: PlanWeekUpdateWithWhereUniqueWithoutTrainingPlanInput | PlanWeekUpdateWithWhereUniqueWithoutTrainingPlanInput[]
    updateMany?: PlanWeekUpdateManyWithWhereWithoutTrainingPlanInput | PlanWeekUpdateManyWithWhereWithoutTrainingPlanInput[]
    deleteMany?: PlanWeekScalarWhereInput | PlanWeekScalarWhereInput[]
  }

  export type TrainingPlanAthleteUpdateManyWithoutTrainingPlanNestedInput = {
    create?: XOR<TrainingPlanAthleteCreateWithoutTrainingPlanInput, TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput> | TrainingPlanAthleteCreateWithoutTrainingPlanInput[] | TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingPlanAthleteCreateOrConnectWithoutTrainingPlanInput | TrainingPlanAthleteCreateOrConnectWithoutTrainingPlanInput[]
    upsert?: TrainingPlanAthleteUpsertWithWhereUniqueWithoutTrainingPlanInput | TrainingPlanAthleteUpsertWithWhereUniqueWithoutTrainingPlanInput[]
    createMany?: TrainingPlanAthleteCreateManyTrainingPlanInputEnvelope
    set?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    disconnect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    delete?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    connect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    update?: TrainingPlanAthleteUpdateWithWhereUniqueWithoutTrainingPlanInput | TrainingPlanAthleteUpdateWithWhereUniqueWithoutTrainingPlanInput[]
    updateMany?: TrainingPlanAthleteUpdateManyWithWhereWithoutTrainingPlanInput | TrainingPlanAthleteUpdateManyWithWhereWithoutTrainingPlanInput[]
    deleteMany?: TrainingPlanAthleteScalarWhereInput | TrainingPlanAthleteScalarWhereInput[]
  }

  export type PlanWeekUncheckedUpdateManyWithoutTrainingPlanNestedInput = {
    create?: XOR<PlanWeekCreateWithoutTrainingPlanInput, PlanWeekUncheckedCreateWithoutTrainingPlanInput> | PlanWeekCreateWithoutTrainingPlanInput[] | PlanWeekUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: PlanWeekCreateOrConnectWithoutTrainingPlanInput | PlanWeekCreateOrConnectWithoutTrainingPlanInput[]
    upsert?: PlanWeekUpsertWithWhereUniqueWithoutTrainingPlanInput | PlanWeekUpsertWithWhereUniqueWithoutTrainingPlanInput[]
    createMany?: PlanWeekCreateManyTrainingPlanInputEnvelope
    set?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
    disconnect?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
    delete?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
    connect?: PlanWeekWhereUniqueInput | PlanWeekWhereUniqueInput[]
    update?: PlanWeekUpdateWithWhereUniqueWithoutTrainingPlanInput | PlanWeekUpdateWithWhereUniqueWithoutTrainingPlanInput[]
    updateMany?: PlanWeekUpdateManyWithWhereWithoutTrainingPlanInput | PlanWeekUpdateManyWithWhereWithoutTrainingPlanInput[]
    deleteMany?: PlanWeekScalarWhereInput | PlanWeekScalarWhereInput[]
  }

  export type TrainingPlanAthleteUncheckedUpdateManyWithoutTrainingPlanNestedInput = {
    create?: XOR<TrainingPlanAthleteCreateWithoutTrainingPlanInput, TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput> | TrainingPlanAthleteCreateWithoutTrainingPlanInput[] | TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingPlanAthleteCreateOrConnectWithoutTrainingPlanInput | TrainingPlanAthleteCreateOrConnectWithoutTrainingPlanInput[]
    upsert?: TrainingPlanAthleteUpsertWithWhereUniqueWithoutTrainingPlanInput | TrainingPlanAthleteUpsertWithWhereUniqueWithoutTrainingPlanInput[]
    createMany?: TrainingPlanAthleteCreateManyTrainingPlanInputEnvelope
    set?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    disconnect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    delete?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    connect?: TrainingPlanAthleteWhereUniqueInput | TrainingPlanAthleteWhereUniqueInput[]
    update?: TrainingPlanAthleteUpdateWithWhereUniqueWithoutTrainingPlanInput | TrainingPlanAthleteUpdateWithWhereUniqueWithoutTrainingPlanInput[]
    updateMany?: TrainingPlanAthleteUpdateManyWithWhereWithoutTrainingPlanInput | TrainingPlanAthleteUpdateManyWithWhereWithoutTrainingPlanInput[]
    deleteMany?: TrainingPlanAthleteScalarWhereInput | TrainingPlanAthleteScalarWhereInput[]
  }

  export type TrainingPlanCreateNestedOneWithoutAthletesInput = {
    create?: XOR<TrainingPlanCreateWithoutAthletesInput, TrainingPlanUncheckedCreateWithoutAthletesInput>
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutAthletesInput
    connect?: TrainingPlanWhereUniqueInput
  }

  export type AthleteCreateNestedOneWithoutTrainingPlanAthletesInput = {
    create?: XOR<AthleteCreateWithoutTrainingPlanAthletesInput, AthleteUncheckedCreateWithoutTrainingPlanAthletesInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutTrainingPlanAthletesInput
    connect?: AthleteWhereUniqueInput
  }

  export type TrainingPlanUpdateOneRequiredWithoutAthletesNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutAthletesInput, TrainingPlanUncheckedCreateWithoutAthletesInput>
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutAthletesInput
    upsert?: TrainingPlanUpsertWithoutAthletesInput
    connect?: TrainingPlanWhereUniqueInput
    update?: XOR<XOR<TrainingPlanUpdateToOneWithWhereWithoutAthletesInput, TrainingPlanUpdateWithoutAthletesInput>, TrainingPlanUncheckedUpdateWithoutAthletesInput>
  }

  export type AthleteUpdateOneRequiredWithoutTrainingPlanAthletesNestedInput = {
    create?: XOR<AthleteCreateWithoutTrainingPlanAthletesInput, AthleteUncheckedCreateWithoutTrainingPlanAthletesInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutTrainingPlanAthletesInput
    upsert?: AthleteUpsertWithoutTrainingPlanAthletesInput
    connect?: AthleteWhereUniqueInput
    update?: XOR<XOR<AthleteUpdateToOneWithWhereWithoutTrainingPlanAthletesInput, AthleteUpdateWithoutTrainingPlanAthletesInput>, AthleteUncheckedUpdateWithoutTrainingPlanAthletesInput>
  }

  export type TrainingPlanCreateNestedOneWithoutWeeksInput = {
    create?: XOR<TrainingPlanCreateWithoutWeeksInput, TrainingPlanUncheckedCreateWithoutWeeksInput>
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutWeeksInput
    connect?: TrainingPlanWhereUniqueInput
  }

  export type PlanWorkoutCreateNestedManyWithoutWeekInput = {
    create?: XOR<PlanWorkoutCreateWithoutWeekInput, PlanWorkoutUncheckedCreateWithoutWeekInput> | PlanWorkoutCreateWithoutWeekInput[] | PlanWorkoutUncheckedCreateWithoutWeekInput[]
    connectOrCreate?: PlanWorkoutCreateOrConnectWithoutWeekInput | PlanWorkoutCreateOrConnectWithoutWeekInput[]
    createMany?: PlanWorkoutCreateManyWeekInputEnvelope
    connect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
  }

  export type PlanWorkoutUncheckedCreateNestedManyWithoutWeekInput = {
    create?: XOR<PlanWorkoutCreateWithoutWeekInput, PlanWorkoutUncheckedCreateWithoutWeekInput> | PlanWorkoutCreateWithoutWeekInput[] | PlanWorkoutUncheckedCreateWithoutWeekInput[]
    connectOrCreate?: PlanWorkoutCreateOrConnectWithoutWeekInput | PlanWorkoutCreateOrConnectWithoutWeekInput[]
    createMany?: PlanWorkoutCreateManyWeekInputEnvelope
    connect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
  }

  export type TrainingPlanUpdateOneRequiredWithoutWeeksNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutWeeksInput, TrainingPlanUncheckedCreateWithoutWeeksInput>
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutWeeksInput
    upsert?: TrainingPlanUpsertWithoutWeeksInput
    connect?: TrainingPlanWhereUniqueInput
    update?: XOR<XOR<TrainingPlanUpdateToOneWithWhereWithoutWeeksInput, TrainingPlanUpdateWithoutWeeksInput>, TrainingPlanUncheckedUpdateWithoutWeeksInput>
  }

  export type PlanWorkoutUpdateManyWithoutWeekNestedInput = {
    create?: XOR<PlanWorkoutCreateWithoutWeekInput, PlanWorkoutUncheckedCreateWithoutWeekInput> | PlanWorkoutCreateWithoutWeekInput[] | PlanWorkoutUncheckedCreateWithoutWeekInput[]
    connectOrCreate?: PlanWorkoutCreateOrConnectWithoutWeekInput | PlanWorkoutCreateOrConnectWithoutWeekInput[]
    upsert?: PlanWorkoutUpsertWithWhereUniqueWithoutWeekInput | PlanWorkoutUpsertWithWhereUniqueWithoutWeekInput[]
    createMany?: PlanWorkoutCreateManyWeekInputEnvelope
    set?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    disconnect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    delete?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    connect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    update?: PlanWorkoutUpdateWithWhereUniqueWithoutWeekInput | PlanWorkoutUpdateWithWhereUniqueWithoutWeekInput[]
    updateMany?: PlanWorkoutUpdateManyWithWhereWithoutWeekInput | PlanWorkoutUpdateManyWithWhereWithoutWeekInput[]
    deleteMany?: PlanWorkoutScalarWhereInput | PlanWorkoutScalarWhereInput[]
  }

  export type PlanWorkoutUncheckedUpdateManyWithoutWeekNestedInput = {
    create?: XOR<PlanWorkoutCreateWithoutWeekInput, PlanWorkoutUncheckedCreateWithoutWeekInput> | PlanWorkoutCreateWithoutWeekInput[] | PlanWorkoutUncheckedCreateWithoutWeekInput[]
    connectOrCreate?: PlanWorkoutCreateOrConnectWithoutWeekInput | PlanWorkoutCreateOrConnectWithoutWeekInput[]
    upsert?: PlanWorkoutUpsertWithWhereUniqueWithoutWeekInput | PlanWorkoutUpsertWithWhereUniqueWithoutWeekInput[]
    createMany?: PlanWorkoutCreateManyWeekInputEnvelope
    set?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    disconnect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    delete?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    connect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    update?: PlanWorkoutUpdateWithWhereUniqueWithoutWeekInput | PlanWorkoutUpdateWithWhereUniqueWithoutWeekInput[]
    updateMany?: PlanWorkoutUpdateManyWithWhereWithoutWeekInput | PlanWorkoutUpdateManyWithWhereWithoutWeekInput[]
    deleteMany?: PlanWorkoutScalarWhereInput | PlanWorkoutScalarWhereInput[]
  }

  export type PlanWorkoutCreateNestedManyWithoutWorkoutTypeInput = {
    create?: XOR<PlanWorkoutCreateWithoutWorkoutTypeInput, PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput> | PlanWorkoutCreateWithoutWorkoutTypeInput[] | PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput[]
    connectOrCreate?: PlanWorkoutCreateOrConnectWithoutWorkoutTypeInput | PlanWorkoutCreateOrConnectWithoutWorkoutTypeInput[]
    createMany?: PlanWorkoutCreateManyWorkoutTypeInputEnvelope
    connect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
  }

  export type PlanWorkoutUncheckedCreateNestedManyWithoutWorkoutTypeInput = {
    create?: XOR<PlanWorkoutCreateWithoutWorkoutTypeInput, PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput> | PlanWorkoutCreateWithoutWorkoutTypeInput[] | PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput[]
    connectOrCreate?: PlanWorkoutCreateOrConnectWithoutWorkoutTypeInput | PlanWorkoutCreateOrConnectWithoutWorkoutTypeInput[]
    createMany?: PlanWorkoutCreateManyWorkoutTypeInputEnvelope
    connect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
  }

  export type PlanWorkoutUpdateManyWithoutWorkoutTypeNestedInput = {
    create?: XOR<PlanWorkoutCreateWithoutWorkoutTypeInput, PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput> | PlanWorkoutCreateWithoutWorkoutTypeInput[] | PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput[]
    connectOrCreate?: PlanWorkoutCreateOrConnectWithoutWorkoutTypeInput | PlanWorkoutCreateOrConnectWithoutWorkoutTypeInput[]
    upsert?: PlanWorkoutUpsertWithWhereUniqueWithoutWorkoutTypeInput | PlanWorkoutUpsertWithWhereUniqueWithoutWorkoutTypeInput[]
    createMany?: PlanWorkoutCreateManyWorkoutTypeInputEnvelope
    set?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    disconnect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    delete?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    connect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    update?: PlanWorkoutUpdateWithWhereUniqueWithoutWorkoutTypeInput | PlanWorkoutUpdateWithWhereUniqueWithoutWorkoutTypeInput[]
    updateMany?: PlanWorkoutUpdateManyWithWhereWithoutWorkoutTypeInput | PlanWorkoutUpdateManyWithWhereWithoutWorkoutTypeInput[]
    deleteMany?: PlanWorkoutScalarWhereInput | PlanWorkoutScalarWhereInput[]
  }

  export type PlanWorkoutUncheckedUpdateManyWithoutWorkoutTypeNestedInput = {
    create?: XOR<PlanWorkoutCreateWithoutWorkoutTypeInput, PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput> | PlanWorkoutCreateWithoutWorkoutTypeInput[] | PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput[]
    connectOrCreate?: PlanWorkoutCreateOrConnectWithoutWorkoutTypeInput | PlanWorkoutCreateOrConnectWithoutWorkoutTypeInput[]
    upsert?: PlanWorkoutUpsertWithWhereUniqueWithoutWorkoutTypeInput | PlanWorkoutUpsertWithWhereUniqueWithoutWorkoutTypeInput[]
    createMany?: PlanWorkoutCreateManyWorkoutTypeInputEnvelope
    set?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    disconnect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    delete?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    connect?: PlanWorkoutWhereUniqueInput | PlanWorkoutWhereUniqueInput[]
    update?: PlanWorkoutUpdateWithWhereUniqueWithoutWorkoutTypeInput | PlanWorkoutUpdateWithWhereUniqueWithoutWorkoutTypeInput[]
    updateMany?: PlanWorkoutUpdateManyWithWhereWithoutWorkoutTypeInput | PlanWorkoutUpdateManyWithWhereWithoutWorkoutTypeInput[]
    deleteMany?: PlanWorkoutScalarWhereInput | PlanWorkoutScalarWhereInput[]
  }

  export type PlanWeekCreateNestedOneWithoutWorkoutsInput = {
    create?: XOR<PlanWeekCreateWithoutWorkoutsInput, PlanWeekUncheckedCreateWithoutWorkoutsInput>
    connectOrCreate?: PlanWeekCreateOrConnectWithoutWorkoutsInput
    connect?: PlanWeekWhereUniqueInput
  }

  export type WorkoutTypeCreateNestedOneWithoutWorkoutsInput = {
    create?: XOR<WorkoutTypeCreateWithoutWorkoutsInput, WorkoutTypeUncheckedCreateWithoutWorkoutsInput>
    connectOrCreate?: WorkoutTypeCreateOrConnectWithoutWorkoutsInput
    connect?: WorkoutTypeWhereUniqueInput
  }

  export type PlanWeekUpdateOneRequiredWithoutWorkoutsNestedInput = {
    create?: XOR<PlanWeekCreateWithoutWorkoutsInput, PlanWeekUncheckedCreateWithoutWorkoutsInput>
    connectOrCreate?: PlanWeekCreateOrConnectWithoutWorkoutsInput
    upsert?: PlanWeekUpsertWithoutWorkoutsInput
    connect?: PlanWeekWhereUniqueInput
    update?: XOR<XOR<PlanWeekUpdateToOneWithWhereWithoutWorkoutsInput, PlanWeekUpdateWithoutWorkoutsInput>, PlanWeekUncheckedUpdateWithoutWorkoutsInput>
  }

  export type WorkoutTypeUpdateOneRequiredWithoutWorkoutsNestedInput = {
    create?: XOR<WorkoutTypeCreateWithoutWorkoutsInput, WorkoutTypeUncheckedCreateWithoutWorkoutsInput>
    connectOrCreate?: WorkoutTypeCreateOrConnectWithoutWorkoutsInput
    upsert?: WorkoutTypeUpsertWithoutWorkoutsInput
    connect?: WorkoutTypeWhereUniqueInput
    update?: XOR<XOR<WorkoutTypeUpdateToOneWithWhereWithoutWorkoutsInput, WorkoutTypeUpdateWithoutWorkoutsInput>, WorkoutTypeUncheckedUpdateWithoutWorkoutsInput>
  }

  export type AthleteCreateNestedOneWithoutWorkoutResultsInput = {
    create?: XOR<AthleteCreateWithoutWorkoutResultsInput, AthleteUncheckedCreateWithoutWorkoutResultsInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutWorkoutResultsInput
    connect?: AthleteWhereUniqueInput
  }

  export type AthleteUpdateOneRequiredWithoutWorkoutResultsNestedInput = {
    create?: XOR<AthleteCreateWithoutWorkoutResultsInput, AthleteUncheckedCreateWithoutWorkoutResultsInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutWorkoutResultsInput
    upsert?: AthleteUpsertWithoutWorkoutResultsInput
    connect?: AthleteWhereUniqueInput
    update?: XOR<XOR<AthleteUpdateToOneWithWhereWithoutWorkoutResultsInput, AthleteUpdateWithoutWorkoutResultsInput>, AthleteUncheckedUpdateWithoutWorkoutResultsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AthleteCreateWithoutCoachInput = {
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutResults?: WorkoutResultCreateNestedManyWithoutAthleteInput
    trainingPlanAthletes?: TrainingPlanAthleteCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUncheckedCreateWithoutCoachInput = {
    id?: number
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutResults?: WorkoutResultUncheckedCreateNestedManyWithoutAthleteInput
    trainingPlanAthletes?: TrainingPlanAthleteUncheckedCreateNestedManyWithoutAthleteInput
  }

  export type AthleteCreateOrConnectWithoutCoachInput = {
    where: AthleteWhereUniqueInput
    create: XOR<AthleteCreateWithoutCoachInput, AthleteUncheckedCreateWithoutCoachInput>
  }

  export type AthleteCreateManyCoachInputEnvelope = {
    data: AthleteCreateManyCoachInput | AthleteCreateManyCoachInput[]
    skipDuplicates?: boolean
  }

  export type TrainingPlanCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    weeks?: PlanWeekCreateNestedManyWithoutTrainingPlanInput
    athletes?: TrainingPlanAthleteCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    weeks?: PlanWeekUncheckedCreateNestedManyWithoutTrainingPlanInput
    athletes?: TrainingPlanAthleteUncheckedCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanCreateOrConnectWithoutUserInput = {
    where: TrainingPlanWhereUniqueInput
    create: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput>
  }

  export type TrainingPlanCreateManyUserInputEnvelope = {
    data: TrainingPlanCreateManyUserInput | TrainingPlanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type AthleteUpsertWithWhereUniqueWithoutCoachInput = {
    where: AthleteWhereUniqueInput
    update: XOR<AthleteUpdateWithoutCoachInput, AthleteUncheckedUpdateWithoutCoachInput>
    create: XOR<AthleteCreateWithoutCoachInput, AthleteUncheckedCreateWithoutCoachInput>
  }

  export type AthleteUpdateWithWhereUniqueWithoutCoachInput = {
    where: AthleteWhereUniqueInput
    data: XOR<AthleteUpdateWithoutCoachInput, AthleteUncheckedUpdateWithoutCoachInput>
  }

  export type AthleteUpdateManyWithWhereWithoutCoachInput = {
    where: AthleteScalarWhereInput
    data: XOR<AthleteUpdateManyMutationInput, AthleteUncheckedUpdateManyWithoutCoachInput>
  }

  export type AthleteScalarWhereInput = {
    AND?: AthleteScalarWhereInput | AthleteScalarWhereInput[]
    OR?: AthleteScalarWhereInput[]
    NOT?: AthleteScalarWhereInput | AthleteScalarWhereInput[]
    id?: IntFilter<"Athlete"> | number
    firstName?: StringFilter<"Athlete"> | string
    lastName?: StringFilter<"Athlete"> | string
    birthday?: DateTimeFilter<"Athlete"> | Date | string
    grade?: IntFilter<"Athlete"> | number
    time1600m?: IntFilter<"Athlete"> | number
    createdAt?: DateTimeFilter<"Athlete"> | Date | string
    updatedAt?: DateTimeFilter<"Athlete"> | Date | string
    coachId?: StringFilter<"Athlete"> | string
  }

  export type TrainingPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: TrainingPlanWhereUniqueInput
    update: XOR<TrainingPlanUpdateWithoutUserInput, TrainingPlanUncheckedUpdateWithoutUserInput>
    create: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput>
  }

  export type TrainingPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: TrainingPlanWhereUniqueInput
    data: XOR<TrainingPlanUpdateWithoutUserInput, TrainingPlanUncheckedUpdateWithoutUserInput>
  }

  export type TrainingPlanUpdateManyWithWhereWithoutUserInput = {
    where: TrainingPlanScalarWhereInput
    data: XOR<TrainingPlanUpdateManyMutationInput, TrainingPlanUncheckedUpdateManyWithoutUserInput>
  }

  export type TrainingPlanScalarWhereInput = {
    AND?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
    OR?: TrainingPlanScalarWhereInput[]
    NOT?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
    id?: StringFilter<"TrainingPlan"> | string
    title?: StringFilter<"TrainingPlan"> | string
    description?: StringNullableFilter<"TrainingPlan"> | string | null
    duration?: StringFilter<"TrainingPlan"> | string
    durationWeeks?: IntFilter<"TrainingPlan"> | number
    startDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    endDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    progress?: IntNullableFilter<"TrainingPlan"> | number | null
    type?: StringNullableFilter<"TrainingPlan"> | string | null
    planType?: StringNullableFilter<"TrainingPlan"> | string | null
    totalWorkouts?: IntNullableFilter<"TrainingPlan"> | number | null
    isCompleted?: BoolFilter<"TrainingPlan"> | boolean
    userId?: StringFilter<"TrainingPlan"> | string
    createdAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingPlan"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    athletes?: AthleteCreateNestedManyWithoutCoachInput
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    athletes?: AthleteUncheckedCreateNestedManyWithoutCoachInput
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    athletes?: AthleteUpdateManyWithoutCoachNestedInput
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    athletes?: AthleteUncheckedUpdateManyWithoutCoachNestedInput
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    athletes?: AthleteCreateNestedManyWithoutCoachInput
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    athletes?: AthleteUncheckedCreateNestedManyWithoutCoachInput
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    athletes?: AthleteUpdateManyWithoutCoachNestedInput
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    athletes?: AthleteUncheckedUpdateManyWithoutCoachNestedInput
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAthletesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAthletesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAthletesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAthletesInput, UserUncheckedCreateWithoutAthletesInput>
  }

  export type WorkoutResultCreateWithoutAthleteInput = {
    id?: string
    date: Date | string
    type: string
    details: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutResultUncheckedCreateWithoutAthleteInput = {
    id?: string
    date: Date | string
    type: string
    details: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutResultCreateOrConnectWithoutAthleteInput = {
    where: WorkoutResultWhereUniqueInput
    create: XOR<WorkoutResultCreateWithoutAthleteInput, WorkoutResultUncheckedCreateWithoutAthleteInput>
  }

  export type WorkoutResultCreateManyAthleteInputEnvelope = {
    data: WorkoutResultCreateManyAthleteInput | WorkoutResultCreateManyAthleteInput[]
    skipDuplicates?: boolean
  }

  export type TrainingPlanAthleteCreateWithoutAthleteInput = {
    assignedAt?: Date | string
    trainingPlan: TrainingPlanCreateNestedOneWithoutAthletesInput
  }

  export type TrainingPlanAthleteUncheckedCreateWithoutAthleteInput = {
    trainingPlanId: string
    assignedAt?: Date | string
  }

  export type TrainingPlanAthleteCreateOrConnectWithoutAthleteInput = {
    where: TrainingPlanAthleteWhereUniqueInput
    create: XOR<TrainingPlanAthleteCreateWithoutAthleteInput, TrainingPlanAthleteUncheckedCreateWithoutAthleteInput>
  }

  export type TrainingPlanAthleteCreateManyAthleteInputEnvelope = {
    data: TrainingPlanAthleteCreateManyAthleteInput | TrainingPlanAthleteCreateManyAthleteInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAthletesInput = {
    update: XOR<UserUpdateWithoutAthletesInput, UserUncheckedUpdateWithoutAthletesInput>
    create: XOR<UserCreateWithoutAthletesInput, UserUncheckedCreateWithoutAthletesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAthletesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAthletesInput, UserUncheckedUpdateWithoutAthletesInput>
  }

  export type UserUpdateWithoutAthletesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAthletesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkoutResultUpsertWithWhereUniqueWithoutAthleteInput = {
    where: WorkoutResultWhereUniqueInput
    update: XOR<WorkoutResultUpdateWithoutAthleteInput, WorkoutResultUncheckedUpdateWithoutAthleteInput>
    create: XOR<WorkoutResultCreateWithoutAthleteInput, WorkoutResultUncheckedCreateWithoutAthleteInput>
  }

  export type WorkoutResultUpdateWithWhereUniqueWithoutAthleteInput = {
    where: WorkoutResultWhereUniqueInput
    data: XOR<WorkoutResultUpdateWithoutAthleteInput, WorkoutResultUncheckedUpdateWithoutAthleteInput>
  }

  export type WorkoutResultUpdateManyWithWhereWithoutAthleteInput = {
    where: WorkoutResultScalarWhereInput
    data: XOR<WorkoutResultUpdateManyMutationInput, WorkoutResultUncheckedUpdateManyWithoutAthleteInput>
  }

  export type WorkoutResultScalarWhereInput = {
    AND?: WorkoutResultScalarWhereInput | WorkoutResultScalarWhereInput[]
    OR?: WorkoutResultScalarWhereInput[]
    NOT?: WorkoutResultScalarWhereInput | WorkoutResultScalarWhereInput[]
    id?: StringFilter<"WorkoutResult"> | string
    athleteId?: IntFilter<"WorkoutResult"> | number
    date?: DateTimeFilter<"WorkoutResult"> | Date | string
    type?: StringFilter<"WorkoutResult"> | string
    details?: JsonFilter<"WorkoutResult">
    notes?: StringNullableFilter<"WorkoutResult"> | string | null
    createdAt?: DateTimeFilter<"WorkoutResult"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutResult"> | Date | string
  }

  export type TrainingPlanAthleteUpsertWithWhereUniqueWithoutAthleteInput = {
    where: TrainingPlanAthleteWhereUniqueInput
    update: XOR<TrainingPlanAthleteUpdateWithoutAthleteInput, TrainingPlanAthleteUncheckedUpdateWithoutAthleteInput>
    create: XOR<TrainingPlanAthleteCreateWithoutAthleteInput, TrainingPlanAthleteUncheckedCreateWithoutAthleteInput>
  }

  export type TrainingPlanAthleteUpdateWithWhereUniqueWithoutAthleteInput = {
    where: TrainingPlanAthleteWhereUniqueInput
    data: XOR<TrainingPlanAthleteUpdateWithoutAthleteInput, TrainingPlanAthleteUncheckedUpdateWithoutAthleteInput>
  }

  export type TrainingPlanAthleteUpdateManyWithWhereWithoutAthleteInput = {
    where: TrainingPlanAthleteScalarWhereInput
    data: XOR<TrainingPlanAthleteUpdateManyMutationInput, TrainingPlanAthleteUncheckedUpdateManyWithoutAthleteInput>
  }

  export type TrainingPlanAthleteScalarWhereInput = {
    AND?: TrainingPlanAthleteScalarWhereInput | TrainingPlanAthleteScalarWhereInput[]
    OR?: TrainingPlanAthleteScalarWhereInput[]
    NOT?: TrainingPlanAthleteScalarWhereInput | TrainingPlanAthleteScalarWhereInput[]
    trainingPlanId?: StringFilter<"TrainingPlanAthlete"> | string
    athleteId?: IntFilter<"TrainingPlanAthlete"> | number
    assignedAt?: DateTimeFilter<"TrainingPlanAthlete"> | Date | string
  }

  export type UserCreateWithoutTrainingPlansInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    athletes?: AthleteCreateNestedManyWithoutCoachInput
  }

  export type UserUncheckedCreateWithoutTrainingPlansInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    athletes?: AthleteUncheckedCreateNestedManyWithoutCoachInput
  }

  export type UserCreateOrConnectWithoutTrainingPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
  }

  export type PlanWeekCreateWithoutTrainingPlanInput = {
    id?: string
    weekNumber: number
    dateRange: string
    seasonPhase?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workouts?: PlanWorkoutCreateNestedManyWithoutWeekInput
  }

  export type PlanWeekUncheckedCreateWithoutTrainingPlanInput = {
    id?: string
    weekNumber: number
    dateRange: string
    seasonPhase?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workouts?: PlanWorkoutUncheckedCreateNestedManyWithoutWeekInput
  }

  export type PlanWeekCreateOrConnectWithoutTrainingPlanInput = {
    where: PlanWeekWhereUniqueInput
    create: XOR<PlanWeekCreateWithoutTrainingPlanInput, PlanWeekUncheckedCreateWithoutTrainingPlanInput>
  }

  export type PlanWeekCreateManyTrainingPlanInputEnvelope = {
    data: PlanWeekCreateManyTrainingPlanInput | PlanWeekCreateManyTrainingPlanInput[]
    skipDuplicates?: boolean
  }

  export type TrainingPlanAthleteCreateWithoutTrainingPlanInput = {
    assignedAt?: Date | string
    athlete: AthleteCreateNestedOneWithoutTrainingPlanAthletesInput
  }

  export type TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput = {
    athleteId: number
    assignedAt?: Date | string
  }

  export type TrainingPlanAthleteCreateOrConnectWithoutTrainingPlanInput = {
    where: TrainingPlanAthleteWhereUniqueInput
    create: XOR<TrainingPlanAthleteCreateWithoutTrainingPlanInput, TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput>
  }

  export type TrainingPlanAthleteCreateManyTrainingPlanInputEnvelope = {
    data: TrainingPlanAthleteCreateManyTrainingPlanInput | TrainingPlanAthleteCreateManyTrainingPlanInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTrainingPlansInput = {
    update: XOR<UserUpdateWithoutTrainingPlansInput, UserUncheckedUpdateWithoutTrainingPlansInput>
    create: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTrainingPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTrainingPlansInput, UserUncheckedUpdateWithoutTrainingPlansInput>
  }

  export type UserUpdateWithoutTrainingPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    athletes?: AthleteUpdateManyWithoutCoachNestedInput
  }

  export type UserUncheckedUpdateWithoutTrainingPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    athletes?: AthleteUncheckedUpdateManyWithoutCoachNestedInput
  }

  export type PlanWeekUpsertWithWhereUniqueWithoutTrainingPlanInput = {
    where: PlanWeekWhereUniqueInput
    update: XOR<PlanWeekUpdateWithoutTrainingPlanInput, PlanWeekUncheckedUpdateWithoutTrainingPlanInput>
    create: XOR<PlanWeekCreateWithoutTrainingPlanInput, PlanWeekUncheckedCreateWithoutTrainingPlanInput>
  }

  export type PlanWeekUpdateWithWhereUniqueWithoutTrainingPlanInput = {
    where: PlanWeekWhereUniqueInput
    data: XOR<PlanWeekUpdateWithoutTrainingPlanInput, PlanWeekUncheckedUpdateWithoutTrainingPlanInput>
  }

  export type PlanWeekUpdateManyWithWhereWithoutTrainingPlanInput = {
    where: PlanWeekScalarWhereInput
    data: XOR<PlanWeekUpdateManyMutationInput, PlanWeekUncheckedUpdateManyWithoutTrainingPlanInput>
  }

  export type PlanWeekScalarWhereInput = {
    AND?: PlanWeekScalarWhereInput | PlanWeekScalarWhereInput[]
    OR?: PlanWeekScalarWhereInput[]
    NOT?: PlanWeekScalarWhereInput | PlanWeekScalarWhereInput[]
    id?: StringFilter<"PlanWeek"> | string
    weekNumber?: IntFilter<"PlanWeek"> | number
    dateRange?: StringFilter<"PlanWeek"> | string
    seasonPhase?: StringNullableFilter<"PlanWeek"> | string | null
    trainingPlanId?: StringFilter<"PlanWeek"> | string
    createdAt?: DateTimeFilter<"PlanWeek"> | Date | string
    updatedAt?: DateTimeFilter<"PlanWeek"> | Date | string
  }

  export type TrainingPlanAthleteUpsertWithWhereUniqueWithoutTrainingPlanInput = {
    where: TrainingPlanAthleteWhereUniqueInput
    update: XOR<TrainingPlanAthleteUpdateWithoutTrainingPlanInput, TrainingPlanAthleteUncheckedUpdateWithoutTrainingPlanInput>
    create: XOR<TrainingPlanAthleteCreateWithoutTrainingPlanInput, TrainingPlanAthleteUncheckedCreateWithoutTrainingPlanInput>
  }

  export type TrainingPlanAthleteUpdateWithWhereUniqueWithoutTrainingPlanInput = {
    where: TrainingPlanAthleteWhereUniqueInput
    data: XOR<TrainingPlanAthleteUpdateWithoutTrainingPlanInput, TrainingPlanAthleteUncheckedUpdateWithoutTrainingPlanInput>
  }

  export type TrainingPlanAthleteUpdateManyWithWhereWithoutTrainingPlanInput = {
    where: TrainingPlanAthleteScalarWhereInput
    data: XOR<TrainingPlanAthleteUpdateManyMutationInput, TrainingPlanAthleteUncheckedUpdateManyWithoutTrainingPlanInput>
  }

  export type TrainingPlanCreateWithoutAthletesInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTrainingPlansInput
    weeks?: PlanWeekCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUncheckedCreateWithoutAthletesInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weeks?: PlanWeekUncheckedCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanCreateOrConnectWithoutAthletesInput = {
    where: TrainingPlanWhereUniqueInput
    create: XOR<TrainingPlanCreateWithoutAthletesInput, TrainingPlanUncheckedCreateWithoutAthletesInput>
  }

  export type AthleteCreateWithoutTrainingPlanAthletesInput = {
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
    coach: UserCreateNestedOneWithoutAthletesInput
    workoutResults?: WorkoutResultCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUncheckedCreateWithoutTrainingPlanAthletesInput = {
    id?: number
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
    coachId: string
    workoutResults?: WorkoutResultUncheckedCreateNestedManyWithoutAthleteInput
  }

  export type AthleteCreateOrConnectWithoutTrainingPlanAthletesInput = {
    where: AthleteWhereUniqueInput
    create: XOR<AthleteCreateWithoutTrainingPlanAthletesInput, AthleteUncheckedCreateWithoutTrainingPlanAthletesInput>
  }

  export type TrainingPlanUpsertWithoutAthletesInput = {
    update: XOR<TrainingPlanUpdateWithoutAthletesInput, TrainingPlanUncheckedUpdateWithoutAthletesInput>
    create: XOR<TrainingPlanCreateWithoutAthletesInput, TrainingPlanUncheckedCreateWithoutAthletesInput>
    where?: TrainingPlanWhereInput
  }

  export type TrainingPlanUpdateToOneWithWhereWithoutAthletesInput = {
    where?: TrainingPlanWhereInput
    data: XOR<TrainingPlanUpdateWithoutAthletesInput, TrainingPlanUncheckedUpdateWithoutAthletesInput>
  }

  export type TrainingPlanUpdateWithoutAthletesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainingPlansNestedInput
    weeks?: PlanWeekUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateWithoutAthletesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weeks?: PlanWeekUncheckedUpdateManyWithoutTrainingPlanNestedInput
  }

  export type AthleteUpsertWithoutTrainingPlanAthletesInput = {
    update: XOR<AthleteUpdateWithoutTrainingPlanAthletesInput, AthleteUncheckedUpdateWithoutTrainingPlanAthletesInput>
    create: XOR<AthleteCreateWithoutTrainingPlanAthletesInput, AthleteUncheckedCreateWithoutTrainingPlanAthletesInput>
    where?: AthleteWhereInput
  }

  export type AthleteUpdateToOneWithWhereWithoutTrainingPlanAthletesInput = {
    where?: AthleteWhereInput
    data: XOR<AthleteUpdateWithoutTrainingPlanAthletesInput, AthleteUncheckedUpdateWithoutTrainingPlanAthletesInput>
  }

  export type AthleteUpdateWithoutTrainingPlanAthletesInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coach?: UserUpdateOneRequiredWithoutAthletesNestedInput
    workoutResults?: WorkoutResultUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateWithoutTrainingPlanAthletesInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachId?: StringFieldUpdateOperationsInput | string
    workoutResults?: WorkoutResultUncheckedUpdateManyWithoutAthleteNestedInput
  }

  export type TrainingPlanCreateWithoutWeeksInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTrainingPlansInput
    athletes?: TrainingPlanAthleteCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUncheckedCreateWithoutWeeksInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    athletes?: TrainingPlanAthleteUncheckedCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanCreateOrConnectWithoutWeeksInput = {
    where: TrainingPlanWhereUniqueInput
    create: XOR<TrainingPlanCreateWithoutWeeksInput, TrainingPlanUncheckedCreateWithoutWeeksInput>
  }

  export type PlanWorkoutCreateWithoutWeekInput = {
    id?: string
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutType: WorkoutTypeCreateNestedOneWithoutWorkoutsInput
  }

  export type PlanWorkoutUncheckedCreateWithoutWeekInput = {
    id?: string
    details?: string | null
    workoutTypeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanWorkoutCreateOrConnectWithoutWeekInput = {
    where: PlanWorkoutWhereUniqueInput
    create: XOR<PlanWorkoutCreateWithoutWeekInput, PlanWorkoutUncheckedCreateWithoutWeekInput>
  }

  export type PlanWorkoutCreateManyWeekInputEnvelope = {
    data: PlanWorkoutCreateManyWeekInput | PlanWorkoutCreateManyWeekInput[]
    skipDuplicates?: boolean
  }

  export type TrainingPlanUpsertWithoutWeeksInput = {
    update: XOR<TrainingPlanUpdateWithoutWeeksInput, TrainingPlanUncheckedUpdateWithoutWeeksInput>
    create: XOR<TrainingPlanCreateWithoutWeeksInput, TrainingPlanUncheckedCreateWithoutWeeksInput>
    where?: TrainingPlanWhereInput
  }

  export type TrainingPlanUpdateToOneWithWhereWithoutWeeksInput = {
    where?: TrainingPlanWhereInput
    data: XOR<TrainingPlanUpdateWithoutWeeksInput, TrainingPlanUncheckedUpdateWithoutWeeksInput>
  }

  export type TrainingPlanUpdateWithoutWeeksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainingPlansNestedInput
    athletes?: TrainingPlanAthleteUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateWithoutWeeksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    athletes?: TrainingPlanAthleteUncheckedUpdateManyWithoutTrainingPlanNestedInput
  }

  export type PlanWorkoutUpsertWithWhereUniqueWithoutWeekInput = {
    where: PlanWorkoutWhereUniqueInput
    update: XOR<PlanWorkoutUpdateWithoutWeekInput, PlanWorkoutUncheckedUpdateWithoutWeekInput>
    create: XOR<PlanWorkoutCreateWithoutWeekInput, PlanWorkoutUncheckedCreateWithoutWeekInput>
  }

  export type PlanWorkoutUpdateWithWhereUniqueWithoutWeekInput = {
    where: PlanWorkoutWhereUniqueInput
    data: XOR<PlanWorkoutUpdateWithoutWeekInput, PlanWorkoutUncheckedUpdateWithoutWeekInput>
  }

  export type PlanWorkoutUpdateManyWithWhereWithoutWeekInput = {
    where: PlanWorkoutScalarWhereInput
    data: XOR<PlanWorkoutUpdateManyMutationInput, PlanWorkoutUncheckedUpdateManyWithoutWeekInput>
  }

  export type PlanWorkoutScalarWhereInput = {
    AND?: PlanWorkoutScalarWhereInput | PlanWorkoutScalarWhereInput[]
    OR?: PlanWorkoutScalarWhereInput[]
    NOT?: PlanWorkoutScalarWhereInput | PlanWorkoutScalarWhereInput[]
    id?: StringFilter<"PlanWorkout"> | string
    details?: StringNullableFilter<"PlanWorkout"> | string | null
    weekId?: StringFilter<"PlanWorkout"> | string
    workoutTypeId?: StringFilter<"PlanWorkout"> | string
    createdAt?: DateTimeFilter<"PlanWorkout"> | Date | string
    updatedAt?: DateTimeFilter<"PlanWorkout"> | Date | string
  }

  export type PlanWorkoutCreateWithoutWorkoutTypeInput = {
    id?: string
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    week: PlanWeekCreateNestedOneWithoutWorkoutsInput
  }

  export type PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput = {
    id?: string
    details?: string | null
    weekId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanWorkoutCreateOrConnectWithoutWorkoutTypeInput = {
    where: PlanWorkoutWhereUniqueInput
    create: XOR<PlanWorkoutCreateWithoutWorkoutTypeInput, PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput>
  }

  export type PlanWorkoutCreateManyWorkoutTypeInputEnvelope = {
    data: PlanWorkoutCreateManyWorkoutTypeInput | PlanWorkoutCreateManyWorkoutTypeInput[]
    skipDuplicates?: boolean
  }

  export type PlanWorkoutUpsertWithWhereUniqueWithoutWorkoutTypeInput = {
    where: PlanWorkoutWhereUniqueInput
    update: XOR<PlanWorkoutUpdateWithoutWorkoutTypeInput, PlanWorkoutUncheckedUpdateWithoutWorkoutTypeInput>
    create: XOR<PlanWorkoutCreateWithoutWorkoutTypeInput, PlanWorkoutUncheckedCreateWithoutWorkoutTypeInput>
  }

  export type PlanWorkoutUpdateWithWhereUniqueWithoutWorkoutTypeInput = {
    where: PlanWorkoutWhereUniqueInput
    data: XOR<PlanWorkoutUpdateWithoutWorkoutTypeInput, PlanWorkoutUncheckedUpdateWithoutWorkoutTypeInput>
  }

  export type PlanWorkoutUpdateManyWithWhereWithoutWorkoutTypeInput = {
    where: PlanWorkoutScalarWhereInput
    data: XOR<PlanWorkoutUpdateManyMutationInput, PlanWorkoutUncheckedUpdateManyWithoutWorkoutTypeInput>
  }

  export type PlanWeekCreateWithoutWorkoutsInput = {
    id?: string
    weekNumber: number
    dateRange: string
    seasonPhase?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingPlan: TrainingPlanCreateNestedOneWithoutWeeksInput
  }

  export type PlanWeekUncheckedCreateWithoutWorkoutsInput = {
    id?: string
    weekNumber: number
    dateRange: string
    seasonPhase?: string | null
    trainingPlanId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanWeekCreateOrConnectWithoutWorkoutsInput = {
    where: PlanWeekWhereUniqueInput
    create: XOR<PlanWeekCreateWithoutWorkoutsInput, PlanWeekUncheckedCreateWithoutWorkoutsInput>
  }

  export type WorkoutTypeCreateWithoutWorkoutsInput = {
    id?: string
    name: string
    color: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutTypeUncheckedCreateWithoutWorkoutsInput = {
    id?: string
    name: string
    color: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutTypeCreateOrConnectWithoutWorkoutsInput = {
    where: WorkoutTypeWhereUniqueInput
    create: XOR<WorkoutTypeCreateWithoutWorkoutsInput, WorkoutTypeUncheckedCreateWithoutWorkoutsInput>
  }

  export type PlanWeekUpsertWithoutWorkoutsInput = {
    update: XOR<PlanWeekUpdateWithoutWorkoutsInput, PlanWeekUncheckedUpdateWithoutWorkoutsInput>
    create: XOR<PlanWeekCreateWithoutWorkoutsInput, PlanWeekUncheckedCreateWithoutWorkoutsInput>
    where?: PlanWeekWhereInput
  }

  export type PlanWeekUpdateToOneWithWhereWithoutWorkoutsInput = {
    where?: PlanWeekWhereInput
    data: XOR<PlanWeekUpdateWithoutWorkoutsInput, PlanWeekUncheckedUpdateWithoutWorkoutsInput>
  }

  export type PlanWeekUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    dateRange?: StringFieldUpdateOperationsInput | string
    seasonPhase?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlan?: TrainingPlanUpdateOneRequiredWithoutWeeksNestedInput
  }

  export type PlanWeekUncheckedUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    dateRange?: StringFieldUpdateOperationsInput | string
    seasonPhase?: NullableStringFieldUpdateOperationsInput | string | null
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutTypeUpsertWithoutWorkoutsInput = {
    update: XOR<WorkoutTypeUpdateWithoutWorkoutsInput, WorkoutTypeUncheckedUpdateWithoutWorkoutsInput>
    create: XOR<WorkoutTypeCreateWithoutWorkoutsInput, WorkoutTypeUncheckedCreateWithoutWorkoutsInput>
    where?: WorkoutTypeWhereInput
  }

  export type WorkoutTypeUpdateToOneWithWhereWithoutWorkoutsInput = {
    where?: WorkoutTypeWhereInput
    data: XOR<WorkoutTypeUpdateWithoutWorkoutsInput, WorkoutTypeUncheckedUpdateWithoutWorkoutsInput>
  }

  export type WorkoutTypeUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutTypeUncheckedUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteCreateWithoutWorkoutResultsInput = {
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
    coach: UserCreateNestedOneWithoutAthletesInput
    trainingPlanAthletes?: TrainingPlanAthleteCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUncheckedCreateWithoutWorkoutResultsInput = {
    id?: number
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
    coachId: string
    trainingPlanAthletes?: TrainingPlanAthleteUncheckedCreateNestedManyWithoutAthleteInput
  }

  export type AthleteCreateOrConnectWithoutWorkoutResultsInput = {
    where: AthleteWhereUniqueInput
    create: XOR<AthleteCreateWithoutWorkoutResultsInput, AthleteUncheckedCreateWithoutWorkoutResultsInput>
  }

  export type AthleteUpsertWithoutWorkoutResultsInput = {
    update: XOR<AthleteUpdateWithoutWorkoutResultsInput, AthleteUncheckedUpdateWithoutWorkoutResultsInput>
    create: XOR<AthleteCreateWithoutWorkoutResultsInput, AthleteUncheckedCreateWithoutWorkoutResultsInput>
    where?: AthleteWhereInput
  }

  export type AthleteUpdateToOneWithWhereWithoutWorkoutResultsInput = {
    where?: AthleteWhereInput
    data: XOR<AthleteUpdateWithoutWorkoutResultsInput, AthleteUncheckedUpdateWithoutWorkoutResultsInput>
  }

  export type AthleteUpdateWithoutWorkoutResultsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coach?: UserUpdateOneRequiredWithoutAthletesNestedInput
    trainingPlanAthletes?: TrainingPlanAthleteUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateWithoutWorkoutResultsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachId?: StringFieldUpdateOperationsInput | string
    trainingPlanAthletes?: TrainingPlanAthleteUncheckedUpdateManyWithoutAthleteNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AthleteCreateManyCoachInput = {
    id?: number
    firstName: string
    lastName: string
    birthday: Date | string
    grade: number
    time1600m: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingPlanCreateManyUserInput = {
    id?: string
    title: string
    description?: string | null
    duration: string
    durationWeeks: number
    startDate: Date | string
    endDate: Date | string
    progress?: number | null
    type?: string | null
    planType?: string | null
    totalWorkouts?: number | null
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteUpdateWithoutCoachInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutResults?: WorkoutResultUpdateManyWithoutAthleteNestedInput
    trainingPlanAthletes?: TrainingPlanAthleteUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateWithoutCoachInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutResults?: WorkoutResultUncheckedUpdateManyWithoutAthleteNestedInput
    trainingPlanAthletes?: TrainingPlanAthleteUncheckedUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateManyWithoutCoachInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: IntFieldUpdateOperationsInput | number
    time1600m?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weeks?: PlanWeekUpdateManyWithoutTrainingPlanNestedInput
    athletes?: TrainingPlanAthleteUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weeks?: PlanWeekUncheckedUpdateManyWithoutTrainingPlanNestedInput
    athletes?: TrainingPlanAthleteUncheckedUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: StringFieldUpdateOperationsInput | string
    durationWeeks?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    totalWorkouts?: NullableIntFieldUpdateOperationsInput | number | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutResultCreateManyAthleteInput = {
    id?: string
    date: Date | string
    type: string
    details: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingPlanAthleteCreateManyAthleteInput = {
    trainingPlanId: string
    assignedAt?: Date | string
  }

  export type WorkoutResultUpdateWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutResultUncheckedUpdateWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutResultUncheckedUpdateManyWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    details?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanAthleteUpdateWithoutAthleteInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlan?: TrainingPlanUpdateOneRequiredWithoutAthletesNestedInput
  }

  export type TrainingPlanAthleteUncheckedUpdateWithoutAthleteInput = {
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanAthleteUncheckedUpdateManyWithoutAthleteInput = {
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWeekCreateManyTrainingPlanInput = {
    id?: string
    weekNumber: number
    dateRange: string
    seasonPhase?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingPlanAthleteCreateManyTrainingPlanInput = {
    athleteId: number
    assignedAt?: Date | string
  }

  export type PlanWeekUpdateWithoutTrainingPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    dateRange?: StringFieldUpdateOperationsInput | string
    seasonPhase?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workouts?: PlanWorkoutUpdateManyWithoutWeekNestedInput
  }

  export type PlanWeekUncheckedUpdateWithoutTrainingPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    dateRange?: StringFieldUpdateOperationsInput | string
    seasonPhase?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workouts?: PlanWorkoutUncheckedUpdateManyWithoutWeekNestedInput
  }

  export type PlanWeekUncheckedUpdateManyWithoutTrainingPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    dateRange?: StringFieldUpdateOperationsInput | string
    seasonPhase?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanAthleteUpdateWithoutTrainingPlanInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    athlete?: AthleteUpdateOneRequiredWithoutTrainingPlanAthletesNestedInput
  }

  export type TrainingPlanAthleteUncheckedUpdateWithoutTrainingPlanInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanAthleteUncheckedUpdateManyWithoutTrainingPlanInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWorkoutCreateManyWeekInput = {
    id?: string
    details?: string | null
    workoutTypeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanWorkoutUpdateWithoutWeekInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutType?: WorkoutTypeUpdateOneRequiredWithoutWorkoutsNestedInput
  }

  export type PlanWorkoutUncheckedUpdateWithoutWeekInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    workoutTypeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWorkoutUncheckedUpdateManyWithoutWeekInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    workoutTypeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWorkoutCreateManyWorkoutTypeInput = {
    id?: string
    details?: string | null
    weekId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanWorkoutUpdateWithoutWorkoutTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    week?: PlanWeekUpdateOneRequiredWithoutWorkoutsNestedInput
  }

  export type PlanWorkoutUncheckedUpdateWithoutWorkoutTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    weekId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanWorkoutUncheckedUpdateManyWithoutWorkoutTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    weekId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}