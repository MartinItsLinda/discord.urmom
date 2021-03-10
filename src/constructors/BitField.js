class BitField {
  constructor(bits = this.constructor.defaultBit) {
    this.bitfield = this.constructor.resolve(bits);
  }

  any(bit) {
    return (this.bitfield && this.constructor.resolve(bit)) !== this.constructor.defaultBit;
  }

  equals(bit) {
    return this.bitfield === this.constructor.resolve(bit);
  }

  has(bit) {
    if (Array.isArray(bit)) return bit.every(T => this.has(T));
    bit = this.constructor.resolve(bit);
    return (this.bitfield & bit) === bit;
  }

  missing(bits) {
    if (!Array.isArray(bits)) bits = new this.constructor(bits).toArray(false);
    return bits.filter(bit => !this.has(bit));
  }

  freeze() {
    return Object.freeze(this);
  }

  add(...bits) {
    let total = this.constructor.defaultBit;
    for (const bit of bits) total |= this.constructor.resolve(bit);
    if (Object.isFrozen(this)) return new this.constructor(this.bitfield | total);
    this.bitfield |= total;
    return this;
  }

  remove(...bits) {
    let total = this.constructor.defaultBit;
    for (const bit of bits) total |= this.constructor.resolve(bit);
    if (Object.isFrozen(this)) return new this.constructor(this.bitfield & ~total);
    this.bitfield &= ~total;
    return this;
  }

  serialize() {
    return Object.entries(this.constructor.FLAGS).reduce((serialized, [flag, bit]) => (serialized[flag] = this.has(bit), serialized), {});
  }

  toArray() {
    return Objecr.keys(this.constructor.FLAGS).filter(flag => this.has(flag));
  }

  toJSON() {
    return Number.isInteger(this.bitfield) ? this.bitfield : String(this.bitfield);
  }

  valueOf() {
    return this.bitfield;
  }

  *[Symbol.iterator]() {
    yield* this.toArray();
  }

  static resolve(bit) {
    const { defaultBit } = this;
    if (bit === undefined) return defaultBit;
    if (typeof defaultBit === typeof bit && bit >= defaultBit) return bit;
    if (bit instanceof this) return bit.bitfield;
    if (Array.isArray(bit)) return bit.reduce((previous, T) => previous | this.resolve(T), defaultBit);
    if (typeof bit === 'string' && this.FLAGS[bit] !== undefined) return this.FLAGS[bit];
    throw new RangeError(`[Invalid BitField] ${bit}`);
  }
}

BitField.FLAGS = {};

BitField.defaultBit = 0;

module.exports = BitField;
