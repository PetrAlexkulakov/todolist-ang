import { LoggerService } from "./logger.service"

describe('Logger tests', () => {
    let logger: LoggerService;

    beforeEach(() => {
        logger = new LoggerService();
    })

    it('should be created', () => {
        expect(logger).toBeTruthy();
    })

    it('should log error messages', () => {
        spyOn(console, 'error');
        logger.error('Test error', 'TestFile', 'AdditionalParam');

        expect(console.error).toHaveBeenCalledWith(
          '%c TestFile--Test error',
          'color: red',
          'AdditionalParam'
        );
    })

    it('should log warning messages', () => {
        spyOn(console, 'warn');
        logger.warn('Test warning', 'TestFile', 'AdditionalParam');

        expect(console.warn).toHaveBeenCalledWith(
            '%c TestFile--Test warning',
            'color: orange',
            'AdditionalParam'
        );
    })

    it('should log info messages', () => {
        spyOn(console, 'info');
        logger.info('Test info', 'TestFile', 'AdditionalParam');

        expect(console.info).toHaveBeenCalledWith(
            '%c TestFile--Test info',
            'color: green',
            'AdditionalParam'
        );
    })
})