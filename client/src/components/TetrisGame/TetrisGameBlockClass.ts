class TetrisBlock {
    public readonly blockType: number;

    public get blockRotation() : number{
      return this._blockRotation;
    }

    public set blockRotation(rotation : number) {
      if(rotation < 0){
        this._blockRotation = (this._blockShape.length - (rotation % this._blockShape.length)) % this._blockShape.length ;
      }
      else{
        this._blockRotation = rotation % this._blockShape.length;
      }
    }
    
    public get blockShape() : [ypos : number,xpos: number][] {
      return this._blockShape[this._blockRotation];
    }
    
    private _blockRotation : number;

    private _blockShape: readonly [ypos : number,xpos: number][][]

    constructor(blockType: number,blockRotation: number, blockShape: number[][][]) {
        this.blockType = blockType;
        this._blockRotation = blockRotation

        let tempBlockShape : [ypos : number,xpos :number][][] = []

        for(let rotationIdx = 0;rotationIdx < blockShape.length;++rotationIdx){
          let curBlockShape = blockShape[rotationIdx];
          tempBlockShape.push([]);

          for(let rowIdx = 0;rowIdx < curBlockShape.length;++rowIdx){
            for(let colIdx = 0;colIdx < curBlockShape[rowIdx].length;++colIdx){
              if(curBlockShape[rowIdx][colIdx] != 0){
                tempBlockShape[rotationIdx].push([rowIdx,colIdx]);
              }
            }
          }

        }

        this._blockShape = tempBlockShape
    }
    
    // if rotation is 0, rotate the block to counterclockwise,
    // if rotation is 1 or bigger than 1, rotate the block to clockwise
    public rotateBlock(rotation:number) {
      let prevRotation = this._blockRotation;

      if(rotation == 0){
        --this._blockRotation;
        
        if(this._blockRotation < 0)
          this._blockRotation = this._blockShape.length - 1
      }
      else{
        ++this._blockRotation;

        this._blockRotation %= this._blockShape.length
      }

      return prevRotation;
    }
}

export default TetrisBlock;