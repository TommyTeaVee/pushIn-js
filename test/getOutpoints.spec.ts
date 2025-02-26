import { setupJSDOM } from './setup';
import { PushIn } from '../src/pushin';

describe('getInpoints', () => {
  let pushIn: PushIn;

  beforeEach(() => {
    setupJSDOM(`
        <!DOCTYPE html>
            <body>
                <div class="pushin">
                    <div class="pushin-scene">
                        <div id="layer-0" class="pushin-layer">Layer 0</div>
                        <div id="layer-1" class="pushin-layer" data-pushin-to="300">Layer 1</div>
                        <div id="layer-2" class="pushin-layer" data-pushin-to="300,500">Layer 2</div>
                        <div id="layer-3" class="pushin-layer">Layer 3</div>
                    </div>
                </div>
            </body>
        </html>`);

    pushIn = new PushIn(null);
  });

  afterEach(() => pushIn.destroy());

  it('Should return inpoint + layerDepth by default for first layer', () => {
    pushIn['layerDepth'] = 300;

    const inpoint = 100;

    const elem = document.querySelector<HTMLElement>('#layer-0');
    const result = pushIn['getOutpoints'](elem, inpoint, 0);

    expect(result).toEqual([400]);
  });

  it('Should return data-attribute value if set', () => {
    pushIn['layerDepth'] = 300;

    const inpoint = 100;

    const elem = document.querySelector<HTMLElement>('#layer-1');
    const result = pushIn['getOutpoints'](elem, inpoint, 1);

    expect(result).toEqual([300]);
  });

  it('Should return array of data from data-attribute if set', () => {
    pushIn['layerDepth'] = 300;

    const inpoint = 100;

    const elem = document.querySelector<HTMLElement>('#layer-2');
    const result = pushIn['getOutpoints'](elem, inpoint, 2);

    expect(result).toEqual([300, 500]);
  });

  it('Should generate value based on previous inpoint', () => {
    pushIn['layerDepth'] = 300;

    const inpoint = 500;

    const elem = document.querySelector<HTMLElement>('#layer-3');
    const result = pushIn['getOutpoints'](elem, inpoint, 3);

    expect(result).toEqual([800]);
  });
});
