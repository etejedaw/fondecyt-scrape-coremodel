interface LevelsInterface {
	fatal?: (message: string, data?: string) => void;
	error: (message: string, data?: string) => void;
	warn: (message: string, data?: string) => void;
	notice: (message: string, data?: string) => void;
	info: (message: string, data?: string) => void;
	verbose?: (message: string, data?: string) => void;
	debug?: (message: string, data?: string) => void;
	silly?: (message: string, data?: string) => void;
}

export default LevelsInterface;
