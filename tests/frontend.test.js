/**
 * Frontend Unit Tests
 * Tests for the MD5 hashing functionality used in the ColorsLab application
 */

// Use require instead of import for Jest compatibility
const md5 = require('../public/js/md5.js');

describe('MD5 Hash Function', () => {
  describe('basic string hashing', () => {
    test('should return correct MD5 hash for empty string', () => {
      expect(md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e');
    });

    test('should return correct MD5 hash for "hello"', () => {
      expect(md5('hello')).toBe('5d41402abc4b2a76b9719d911017c592');
    });

    test('should return correct MD5 hash for "The quick brown fox"', () => {
      expect(md5('The quick brown fox')).toBe('a2004f37730b9445670a738fa0fc9ee5');
    });

    test('should return correct MD5 hash for "hello world"', () => {
      expect(md5('hello world')).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
    });
  });

  describe('case sensitivity', () => {
    test('should produce different hashes for different cases', () => {
      const upperHash = md5('HELLO');
      const lowerHash = md5('hello');
      expect(upperHash).not.toBe(lowerHash);
    });

    test('should return correct hash for uppercase "HELLO"', () => {
      expect(md5('HELLO')).toBe('eb61eead90e3b899c6bcbe27ac581660');
    });
  });

  describe('special characters', () => {
    test('should handle special characters', () => {
      expect(md5('!@#$%^&*()')).toBe('05b28d17a7b6e7024b6e5d8cc43a8bf7');
    });

    test('should handle spaces', () => {
      expect(md5('   ')).toBe('628631f07321b22d8c176c200c855e1b');
    });

    test('should handle newline characters', () => {
      expect(md5('\n')).toBe('68b329da9893e34099c7d8ad5cb9c940');
    });
  });

  describe('Unicode support', () => {
    test('should handle unicode characters', () => {
      // MD5 hash for "你好" (hello in Chinese)
      expect(md5('你好')).toBe('7eca689f0d3389d9dea66ae112e5cfd7');
    });
  });

  describe('consistency', () => {
    test('should return same hash for same input', () => {
      const input = 'consistent-test-string';
      const hash1 = md5(input);
      const hash2 = md5(input);
      expect(hash1).toBe(hash2);
    });
  });

  describe('output format', () => {
    test('should return 32 character hex string', () => {
      const hash = md5('test');
      expect(hash).toHaveLength(32);
      expect(hash).toMatch(/^[a-f0-9]{32}$/);
    });
  });
});
