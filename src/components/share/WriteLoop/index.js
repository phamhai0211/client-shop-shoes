

 

  export default function WriteLoop(){
    const runCallback = (cb) => {
        return cb();
    };

      return(
          <div>
              {
                runCallback(() => {
                const row = [];
                for (var i = 278; i < 342; i++) {
                    row.push(<div>import F{i} from './{i}.json';</div>);
                }
                return row;
                })
            }
          </div>
      )
  }