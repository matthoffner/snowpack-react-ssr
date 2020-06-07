import stream from 'stream';

export default sheetsRegistry => {
    const cached = {};

    function getFreshStyles() {
        const freshStyles = [];
        const registry = sheetsRegistry ? sheetsRegistry.sheetsRegistry.registry : [];
        registry.forEach(member => {
            const key = member.toString();
            if (!cached[key]) {
                cached[key] = true;
                freshStyles.push(key);

                return;
            }
        });

        return freshStyles;
    }

    return new stream.Transform({
        transform: function appendStyleChunks(chunk, encoding, callback) {
            const subsheet = getFreshStyles().join('');
            if (!!subsheet) {
                this.push(Buffer.from(`<style id="mui-ssr" type="text/css">${subsheet}</style>${chunk.toString()}`));
            } else {
                this.push(Buffer.from(chunk.toString()));
            }
            callback();
        }
    });
};
