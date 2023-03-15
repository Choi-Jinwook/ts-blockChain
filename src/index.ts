import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

const calculateHash = (prevHash: string, height: number, data: string) => {
  const toHash = `${prevHash}${height}${data}`;
  return crypto.createHash("sha256").update(toHash).digest("hex");
};

const createBlock = (
  prevHash: string,
  height: number,
  data: string
): BlockShape => {
  const hash = calculateHash(prevHash, height, data);
  return { hash, prevHash, height, data };
};

const createBlockChain = () => {
  const blocks: BlockShape[] = [];

  const getPrevHash = (): string => {
    if (blocks.length === 0) return "";
    return blocks[blocks.length - 1].hash;
  };

  const addBlock = (data: string): void => {
    const prevHash = getPrevHash();
    const height = blocks.length + 1;
    const newBlock = createBlock(prevHash, height, data);
    blocks.push(newBlock);
  };

  const getBlocks = (): BlockShape[] => {
    return [...blocks];
  };

  return { blocks, getPrevHash, addBlock, getBlocks };
};

const blockChain = createBlockChain();

blockChain.addBlock("First one");
blockChain.addBlock("Second one");
blockChain.addBlock("Third one");
blockChain.addBlock("Fourth one");

console.log(blockChain.getBlocks());
