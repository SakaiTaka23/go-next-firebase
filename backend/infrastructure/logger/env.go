package logger

import (
	"os"
	"strconv"

	"go.uber.org/zap/zapcore"
)

type envVals struct {
	encoding    string
	development bool
	filePath    string
	stdout      bool
	level       zapcore.Level
}

// getEnv ログに関する環境変数を設定
func getEnv() *envVals {
	var err error
	res := envVals{}
	res.encoding = os.Getenv("LOGGER_ENCODING")
	res.development, err = strconv.ParseBool(os.Getenv("LOGGER_DEVELOPMENT"))
	if err != nil {
		res.development = true
	}

	res.filePath = os.Getenv("LOGGER_FILE_PATH")

	res.stdout, err = strconv.ParseBool(os.Getenv("LOGGER_STDOUT"))
	if err != nil {
		res.stdout = true
	}
	if res.stdout {
		res.filePath = "stdout"
	}

	level := os.Getenv("LOGGER_LEVEL")
	switch level {
	case "debug":
		res.level = zapcore.DebugLevel
	case "error":
		res.level = zapcore.ErrorLevel
	default:
		res.level = zapcore.InfoLevel
	}
	return &res
}
