package logger

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var (
	l *zap.Logger
	s *zap.SugaredLogger

	Debug     func(args ...interface{})
	Info      func(args ...interface{})
	Warn      func(args ...interface{})
	Error     func(args ...interface{})
	Debugf    func(tmpl string, args ...interface{})
	Infof     func(tmpl string, args ...interface{})
	Warnf     func(tmpl string, args ...interface{})
	Errorf    func(tmpl string, args ...interface{})
	InfoQuick func(msg string, fields ...zap.Field)
	WarnQuick func(msg string, fields ...zap.Field)
)

func SetUp() error {
	env := getEnv()

	conf := zap.Config{
		Level:       zap.NewAtomicLevelAt(env.level),
		Development: env.development,
		Encoding:    env.encoding,
		OutputPaths: []string{env.filePath},
		EncoderConfig: zapcore.EncoderConfig{
			LevelKey:     "level",
			TimeKey:      "time",
			MessageKey:   "msg",
			CallerKey:    "caller",
			EncodeTime:   zapcore.ISO8601TimeEncoder,
			EncodeLevel:  zapcore.LowercaseLevelEncoder,
			EncodeCaller: zapcore.ShortCallerEncoder,
		},
	}
	var err error
	if l, err = conf.Build(); err != nil {
		return err
	}

	s = l.Sugar()

	// LogのCallerを正しく表示させるために、ファンクションをDIする形にする
	// 例えば、別ファンクション func Debug(...){ s.Debug(...) } のように定義した場合、
	// 出力されるログのcallerが全てlogger/logger.goになってしまう。
	Debug = s.Debug
	Info = s.Info
	Warn = s.Warn
	Error = s.Error
	Debugf = s.Debugf
	Infof = s.Infof
	Warnf = s.Warnf
	Errorf = s.Errorf
	InfoQuick = l.Info
	WarnQuick = l.Warn

	return nil
}
