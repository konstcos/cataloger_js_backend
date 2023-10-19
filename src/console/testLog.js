
class ConsoleCommand {
    static command = 'test';

    run(props) {
        console.log('test console command');
    }
}

module.exports = ConsoleCommand;
