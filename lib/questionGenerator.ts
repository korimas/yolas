import { 
  AgeGroup, 
  OperationType, 
  QuestionType, 
  MathQuestion, 
  DifficultyConfig
} from '@/types';

// 难度配置映射
const DIFFICULTY_CONFIGS: Record<AgeGroup, DifficultyConfig> = {
  [AgeGroup.PRESCHOOL]: {
    ageGroup: AgeGroup.PRESCHOOL,
    maxNumber: 10,
    availableOperations: [OperationType.ADDITION, OperationType.SUBTRACTION],
    questionTypes: [QuestionType.NUMERICAL],
    timeLimit: 30
  },
  [AgeGroup.ELEMENTARY_LOW]: {
    ageGroup: AgeGroup.ELEMENTARY_LOW,
    maxNumber: 100,
    availableOperations: [OperationType.ADDITION, OperationType.SUBTRACTION, OperationType.MULTIPLICATION],
    questionTypes: [QuestionType.NUMERICAL, QuestionType.WORD_PROBLEM],
    timeLimit: 60
  },
  [AgeGroup.ELEMENTARY_HIGH]: {
    ageGroup: AgeGroup.ELEMENTARY_HIGH,
    maxNumber: 1000,
    availableOperations: [OperationType.ADDITION, OperationType.SUBTRACTION, OperationType.MULTIPLICATION, OperationType.DIVISION],
    questionTypes: [QuestionType.NUMERICAL, QuestionType.WORD_PROBLEM],
    timeLimit: 120
  }
};



export class QuestionGenerator {
  
  /**
   * 生成数学题目
   */
  static generateQuestion(ageGroup: AgeGroup, difficulty: number = 1): MathQuestion {
    const config = DIFFICULTY_CONFIGS[ageGroup];
    const operation = this.getRandomOperation(config.availableOperations);
    const questionType = this.getRandomQuestionType(config.questionTypes);
    
    const id = `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    switch (questionType) {
      case QuestionType.WORD_PROBLEM:
        return this.generateWordProblem(id, ageGroup, operation, config, difficulty);
      default:
        return this.generateNumericalQuestion(id, ageGroup, operation, config, difficulty);
    }
  }

  /**
   * 生成数字计算题
   */
  private static generateNumericalQuestion(
    id: string,
    ageGroup: AgeGroup,
    operation: OperationType,
    config: DifficultyConfig,
    difficulty: number
  ): MathQuestion {
    const { operand1, operand2, answer } = this.generateOperands(operation, config, difficulty);
    
    let question = '';
    switch (operation) {
      case OperationType.ADDITION:
        question = `${operand1} + ${operand2} =`;
        break;
      case OperationType.SUBTRACTION:
        question = `${operand1} - ${operand2} =`;
        break;
      case OperationType.MULTIPLICATION:
        question = `${operand1} × ${operand2} =`;
        break;
      case OperationType.DIVISION:
        question = `${operand1} ÷ ${operand2} =`;
        break;
    }

    return {
      id,
      type: QuestionType.NUMERICAL,
      operation,
      question,
      operand1,
      operand2,
      correctAnswer: answer,
      ageGroup,
      difficulty
    };
  }



  /**
   * 生成应用题
   */
  private static generateWordProblem(
    id: string,
    ageGroup: AgeGroup,
    operation: OperationType,
    config: DifficultyConfig,
    difficulty: number
  ): MathQuestion {
    const { operand1, operand2, answer } = this.generateOperands(operation, config, difficulty);
    
    const scenarios = this.getWordProblemScenarios(operation);
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    const question = scenario.template
      .replace('{num1}', operand1.toString())
      .replace('{num2}', operand2?.toString() || '');

    return {
      id,
      type: QuestionType.WORD_PROBLEM,
      operation,
      question,
      operand1,
      operand2,
      correctAnswer: answer,
      ageGroup,
      difficulty
    };
  }

  /**
   * 生成操作数和答案
   */
  private static generateOperands(
    operation: OperationType,
    config: DifficultyConfig,
    difficulty: number
  ): { operand1: number; operand2: number; answer: number } {
    const maxNum = Math.min(config.maxNumber, difficulty * 20 + 10);
    
    let operand1: number;
    let operand2: number;
    let answer: number;

    switch (operation) {
      case OperationType.ADDITION:
        operand1 = Math.floor(Math.random() * maxNum) + 1;
        operand2 = Math.floor(Math.random() * (maxNum - operand1)) + 1;
        answer = operand1 + operand2;
        break;
        
      case OperationType.SUBTRACTION:
        operand1 = Math.floor(Math.random() * maxNum) + 1;
        operand2 = Math.floor(Math.random() * operand1) + 1;
        answer = operand1 - operand2;
        break;
        
      case OperationType.MULTIPLICATION:
        operand1 = Math.floor(Math.random() * Math.min(12, maxNum)) + 1;
        operand2 = Math.floor(Math.random() * Math.min(12, maxNum)) + 1;
        answer = operand1 * operand2;
        break;
        
      case OperationType.DIVISION:
        // 确保整除
        operand2 = Math.floor(Math.random() * Math.min(12, maxNum)) + 1;
        const quotient = Math.floor(Math.random() * Math.min(12, maxNum)) + 1;
        operand1 = operand2 * quotient;
        answer = quotient;
        break;
        
      default:
        operand1 = 1;
        operand2 = 1;
        answer = 2;
    }

    return { operand1, operand2, answer };
  }

  /**
   * 获取随机运算类型
   */
  private static getRandomOperation(operations: OperationType[]): OperationType {
    return operations[Math.floor(Math.random() * operations.length)];
  }

  /**
   * 获取随机题目类型
   */
  private static getRandomQuestionType(types: QuestionType[]): QuestionType {
    return types[Math.floor(Math.random() * types.length)];
  }

  /**
   * 获取应用题场景
   */
  private static getWordProblemScenarios(operation: OperationType) {
    const scenarios = {
      [OperationType.ADDITION]: [
        { template: '小明有{num1}个苹果，小红给了他{num2}个苹果，小明现在有多少个苹果？' },
        { template: '公园里有{num1}只鸟，又飞来了{num2}只鸟，现在公园里总共有多少只鸟？' },
        { template: '妈妈买了{num1}朵花，爸爸买了{num2}朵花，他们总共买了多少朵花？' }
      ],
      [OperationType.SUBTRACTION]: [
        { template: '树上有{num1}个桃子，小猴子吃了{num2}个，树上还剩多少个桃子？' },
        { template: '停车场有{num1}辆车，开走了{num2}辆车，还剩多少辆车？' },
        { template: '小华有{num1}颗糖，给了弟弟{num2}颗，小华还剩多少颗糖？' }
      ],
      [OperationType.MULTIPLICATION]: [
        { template: '每个盒子里有{num1}个球，{num2}个盒子总共有多少个球？' },
        { template: '每天小明要做{num1}道题，{num2}天要做多少道题？' },
        { template: '每束花有{num1}朵，{num2}束花总共有多少朵？' }
      ],
      [OperationType.DIVISION]: [
        { template: '把{num1}个苹果平均分给{num2}个小朋友，每个小朋友分到多少个苹果？' },
        { template: '{num1}本书要放到{num2}个书架上，平均每个书架放多少本书？' },
        { template: '{num1}颗糖要装到{num2}个袋子里，平均每个袋子装多少颗糖？' }
      ]
    };
    
    return scenarios[operation] || scenarios[OperationType.ADDITION];
  }

  /**
   * 批量生成题目
   */
  static generateQuestions(ageGroup: AgeGroup, count: number, difficulty: number = 1): MathQuestion[] {
    const questions: MathQuestion[] = [];
    for (let i = 0; i < count; i++) {
      questions.push(this.generateQuestion(ageGroup, difficulty));
    }
    return questions;
  }
}
